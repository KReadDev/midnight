package com.personal.manga.scrapper;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import androidx.annotation.NonNull;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import com.google.gson.Gson;
import com.personal.manga.domain.Constants;
import com.personal.manga.domain.DownloadData;
import com.personal.manga.domain.Manga;
import com.personal.manga.domain.SiteManga;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

public class DownloadWorkerNh extends Worker {

  public DownloadWorkerNh(@NonNull Context context, @NonNull WorkerParameters workerParams) {
    super(context, workerParams);
  }

  @NonNull
  @Override
  public Result doWork() {


    Gson gson = new Gson();
    SiteManga siteManga = gson.fromJson(getInputData().getString("manga"), SiteManga.class);

    runInThread(getInputData().getString("link"), getInputData().getString("id"), siteManga);
    return Result.success();
  }

  public String getCover(Element doc){
    Element cover = ScrapperFunctions.getElementid(doc, "cover");
    String coverLink ="https:"+ ScrapperFunctions.getElementAtIndex(cover, "tag", "img", 0).attr("data-src");
    return coverLink;
  }

  public void runInThread(String sitelink,String id,SiteManga manga) {

    Document doc = ScrapperFunctions.getDoc(sitelink);

    String location;
    DownloadData dl = new DownloadData();
    dl.setName(manga.getName());
    dl.setMangaId(id);
    dl.setStatus("downloading");
    dl.setSource("nhentai");
    dl.setProgress(0);

    DownloadSingleton instance = DownloadSingleton.getInstance();

    instance.downloads.add(dl);

    try {
      location = downloadManga(id, manga.getPages(), manga.getName(),dl);
    } catch (IOException e) {
      dl.setError("failed to download: "+e.getMessage() );
      throw new RuntimeException(e);
    }



    Manga manga1 = new Manga();
    manga1.setName(manga.getName());
    manga1.setTags(manga.getTags());
    manga1.setPages(manga.getPages());
    manga1.setBookmarked(false);

    converter.convertToPdf(location,manga.getName());

    String coverlink = getCover(doc);

    URL url = null;
    try {
      url = new URL(coverlink);
      new File(Constants.location + "covers").mkdirs();
      BufferedInputStream in = new BufferedInputStream(url.openStream());
      FileOutputStream fileOutputStream = new FileOutputStream(Constants.location + "covers/"+ manga.getName()+".jpg");
      byte dataBuff[] = new byte[1024];
      int bytesRead;
      while ((bytesRead = in.read(dataBuff, 0, 1024)) != -1) {
        fileOutputStream.write(dataBuff, 0, bytesRead);
      }

      fileOutputStream.close();
      in.close();

    } catch (MalformedURLException e) {
      throw new RuntimeException(e);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }

    dl.setProgress(100);

    Serializer.writeManga(manga1);
    dl.setStatus("completed");


  }

  private String downloadManga(String id, int count, String name, DownloadData dl) throws IOException {

    int prog = 1;


    String pathname = Constants.location +"downloading/" + name;
    File dlpath = new File(pathname);

    if(dlpath.exists()){


      for (File file : dlpath.listFiles()) {
        int con = extractNumber(file.getName());
        if (con> prog){
          prog = con;
        }

      }
    }else{
      dlpath.mkdirs();
    }

    for (int i = prog; i <= count; i++) {
      String newLink = "https://nhentai.net/g/"+id+"/"+i;
      Document doc = ScrapperFunctions.getDoc(newLink);


      Element gimg = ScrapperFunctions.getElementid(doc, "image-container");
      String imgLink = "https:"+ ScrapperFunctions.getElementAtIndex(gimg, "tag", "img", 0).attr("src");

      name=name.trim();
      URL url = new URL(imgLink);
      new File(pathname).mkdir();


      BufferedInputStream in = new BufferedInputStream(url.openStream());
      FileOutputStream fileOutputStream = new FileOutputStream(pathname+"/"+name+"_"+i+".png");
      byte dataBuff[] = new byte[1024];
      int bytesRead;
      while ((bytesRead = in.read(dataBuff, 0, 1024)) != -1) {
        fileOutputStream.write(dataBuff, 0, bytesRead);
      }

      fileOutputStream.close();
      in.close();

//            File web = new File("F:\\site\\downloading\\"+name+"\\"+name+""+i+".png");
      String webs = pathname+"/"+name+"_"+i+".png";
      File jpg = new File(pathname+"/"+name+"_"+i+".jpg");
//
//
//            BufferedImage image = ImageIO.read(web);
      Bitmap bimage = BitmapFactory.decodeFile(webs);
      if (bimage != null) {
//                ImageIO.write(image, "jpg", jpg);
        FileOutputStream outputStream = new FileOutputStream(jpg);
        bimage.compress(Bitmap.CompressFormat.JPEG,100, outputStream);
        outputStream.close();

        File oldImg = new File(webs);
        oldImg.delete();

      } else {
      }


      int res = (  (i*100) /count);
      dl.setProgress( res);

    }

    return pathname;



  }

  private static int extractNumber(String s) {
    return Integer.parseInt(s.split("_")[1].split("\\.")[0]);
  }
}
