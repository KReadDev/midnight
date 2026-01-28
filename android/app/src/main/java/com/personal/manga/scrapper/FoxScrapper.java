package com.personal.manga.scrapper;

import com.personal.manga.domain.DownloadData;
import com.personal.manga.domain.Manga;
import com.personal.manga.domain.PageLink;
import com.personal.manga.domain.SiteManga;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
//import org.springframework.stereotype.Service;

//import javax.imageio.ImageIO;
//import java.awt.image.BufferedImage;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.os.Environment;

import androidx.annotation.RequiresApi;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


//@Service
public class FoxScrapper implements Scrapper {

    private final String link = "https://hentaifox.com/";

    public String getLink() {
        return link;
    }

    public   List<SiteManga> getMangas(String sitelink)  {
        Document doc =   ScrapperFunctions.getDoc(sitelink);
        Element galleries = ScrapperFunctions.getElementAtIndex(doc,"class","lc_galleries",0);
        Elements gals = ScrapperFunctions.getElements(galleries,"class","thumb");

        List<SiteManga> mangaList = new ArrayList<>();

        for (Element gal : gals) {
            Element caption = ScrapperFunctions.getElementAtIndex(gal,"class","caption",0);
            Element hLink = ScrapperFunctions.getElementAtIndex(caption,"tag","a",0);
//            String link = ScrapperFunctions.getElementAtIndex(hLink,"attr","href",0).text();
            String link = hLink.attr("href");
            String id = link.replace("/gallery/","").replace("/","");
            String name = hLink.text();
            Element innerThumb = ScrapperFunctions.getElementAtIndex(gal,"class","inner_thumb",0);
            Element img = ScrapperFunctions.getElementAtIndex(innerThumb, "tag", "img", 0);
            String imgLink = img.attr("data-src");

            SiteManga manga = new SiteManga(id,name,imgLink);
            mangaList.add(manga);

        }

        return mangaList;
    }

    @RequiresApi(api = Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
    public List<PageLink> getpageLinks(String sitelink){
        Document doc =   ScrapperFunctions.getDoc(sitelink);

        try {

            Element pagination = ScrapperFunctions.getElementAtIndex(doc,"class","pagination",0);
            Elements pages = ScrapperFunctions.getElements(pagination,"class","page-item");

            List<Element> newPages = pages.stream().filter(page -> !page.hasClass("disabled")).toList();
            List<PageLink> links = new ArrayList<>();
            for (Element pageLink : newPages) {
                Element href = ScrapperFunctions.getElementAtIndex(pageLink,"tag","a",0);
                String link = href.attr("href");
                String number = href.text();
                links.add(new PageLink(number,link));
            }

            return links;
        } catch (IndexOutOfBoundsException e) {
            List<PageLink> links = new ArrayList<>();
            return links;
//            throw new RuntimeException(e);
        }


    }

    public SiteManga getMangaDetails(String sitelink,String id){
        Document doc =   ScrapperFunctions.getDoc(sitelink);

        // cover
        String coverLink = getCover(doc);

        Element info = ScrapperFunctions.getElementAtIndex(doc,"class","info",0);

        // name
        String h1Name = ScrapperFunctions.getElementAtIndex(info,"tag","h1",0).text();
        String name = h1Name.split("\\|")[0];
        List<String> unwanted = new ArrayList<>();
      unwanted.add("\"");
      unwanted.add("/");
      unwanted.add("<");
      unwanted.add(">");
      unwanted.add("*");
      unwanted.add(":");
      unwanted.add("?");
      unwanted.add("|");
      unwanted.add("\\");

      for (String s : unwanted) {
        name = name.replace(s,"");
      }

      while (name.endsWith(".")|| name.endsWith(" ")){
        name = name.substring(0,name.length()-1);
      }



        // tags
        Elements tags;
        try {

            Element tagsContainer = ScrapperFunctions.getElementAtIndex(info, "class", "tags", 0);
            tags = ScrapperFunctions.getElements(tagsContainer,"tag","a");
        }catch (IndexOutOfBoundsException e){
            tags = new Elements();
        }


        List<String> tagList = new ArrayList<>();
        for (Element tag : tags) {
            String tagName = tag.textNodes().get(0).text().trim();
            tagList.add(tagName);
        }

        String pages = "";
        //pages
        for( int i=0;i<ScrapperFunctions.getElements(info, "class", "i_text").size();i++){

            String text = ScrapperFunctions.getElementAtIndex(info, "class", "i_text", i).text();
            if(text.contains("Pages: ")){
                pages = text.replace("Pages: ","");
                break;
            }
        }

        // covers
        Element appendThumbs = ScrapperFunctions.getElementid(doc,"append_thumbs");
        Elements gThumbs  = ScrapperFunctions.getElements(appendThumbs,"class","g_thumb");

        List<String> coverLinks = new ArrayList<>();
        for (Element gThumb : gThumbs) {
            String dataSrc = ScrapperFunctions.getElementAtIndex(gThumb, "tag", "img", 0).attr("data-src");
            coverLinks.add(dataSrc);

        }

        SiteManga siteManga = new SiteManga(id,name,coverLink,Integer.parseInt(pages),tagList,coverLinks);
        return  siteManga;

    }

  @Override
  public void getMangaImages(String sitelink, String id, SiteManga manga) {

  }

  private String getCover(Element doc){
        Element cover = ScrapperFunctions.getElementAtIndex(doc,"class","cover",0);
        String coverLink = ScrapperFunctions.getElementAtIndex(cover,"tag","img",0).attr("src");

//        Element info = ScrapperFunctions.getElementAtIndex(doc,"class","info",0);

        return coverLink;
    }

    public void getInfo(Document doc,String id){

//        Download dl = new Download();

        Element info = ScrapperFunctions.getElementAtIndex(doc,"class","info",0);

        // name
        String h1Name = ScrapperFunctions.getElementAtIndex(info,"tag","h1",0).text();
        String name = h1Name.split("\\|")[0];

//        dl.setName(name);
//        dl.setMangaId(id);
//        dl.setStatus("downloading");
//        dl.setSource("hentaifox");

        // tags
        Elements tags;
        try {

            Element tagsContainer = ScrapperFunctions.getElementAtIndex(info, "class", "tags", 0);
            tags = ScrapperFunctions.getElements(tagsContainer,"tag","a");
        }catch (IndexOutOfBoundsException e){
            tags = new Elements();
        }

        List<String> tagList = new ArrayList<>();
        for (Element tag : tags) {
            String tagName = tag.text();
            tagList.add(tagName);
        }

        //pages
        String pages = "";
        for( int i=0;i<ScrapperFunctions.getElements(info, "class", "i_text").size();i++){

            String text = ScrapperFunctions.getElementAtIndex(info, "class", "i_text", i).text();
            if(text.contains("Pages: ")){
                pages = text.replace("Pages: ","");
                break;
            }
        }
    }

//    public void getMangaImages(String sitelink,String id,SiteManga manga)  {
//
////      ExecutorService service = Executors.newSingleThreadExecutor();
////
////      service.submit(new Runnable() {
////        @Override
////        public void run() {
//          runInThread(sitelink, id, manga);
////        }
////      });
//////      runInThread(sitelink, id, manga);
////      service.shutdown();
//
//    }
//
//  private void runInThread(String sitelink, String id, SiteManga manga) {
//    Document doc =   ScrapperFunctions.getDoc(sitelink);
//
////        Element appendThumbs = ScrapperFunctions.getElementid(doc,"append_thumbs");
////        Element gThumbs  = ScrapperFunctions.getElementAtIndex(appendThumbs,"class","g_thumb",0);
//
////        String dataSrc = ScrapperFunctions.getElementAtIndex(gThumbs, "tag", "a", 0).attr("href");
//
//
//    String location;
//    DownloadData dl = new DownloadData();
//    dl.setName(manga.getName());
//    dl.setMangaId(id);
//    dl.setStatus("downloading");
//    dl.setSource("hentaifox");
//    dl.setProgress(0);
//
//    DownloadSingleton instance = DownloadSingleton.getInstance();
//
//    instance.downloads.add(dl);
//
//    try {
//        location = downloadManga(id, manga.getPages(), manga.getName(),dl);
//    } catch (IOException e) {
//        dl.setError("failed to download: "+e.getMessage() );
//        throw new RuntimeException(e);
//    }
//
//    Manga manga1 = new Manga();
//
//    manga1.setName(manga.getName());
//    manga1.setTags(manga.getTags());
//    manga1.setPages(manga.getPages());
//    manga1.setBookmarked(false);
//
//
////        manga1.setLastRead();
//
//    // convert to pdf
//
//    converter.convertToPdf(location, manga.getName());
//
//
//    // move pdf to finished location
//
//    // download cover
//
//    String coverlink = getCover(doc);
//
//    URL url = null;
//    try {
//        url = new URL(coverlink);
//        new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS) + "/site/covers").mkdir();
//        BufferedInputStream in = new BufferedInputStream(url.openStream());
//        FileOutputStream fileOutputStream = new FileOutputStream(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS) + "/site/covers/"+ manga.getName()+".jpg");
//        byte dataBuff[] = new byte[1024];
//        int bytesRead;
//        while ((bytesRead = in.read(dataBuff, 0, 1024)) != -1) {
//            fileOutputStream.write(dataBuff, 0, bytesRead);
//        }
//
//        fileOutputStream.close();
//        in.close();
//
//    } catch (MalformedURLException e) {
//        throw new RuntimeException(e);
//    } catch (IOException e) {
//        throw new RuntimeException(e);
//    }
//
//    dl.setProgress(100);
//
//    Serializer.writeManga(manga1);
//    dl.setStatus("completed");
//  }
//
//  private String downloadManga(String id, int count, String name, DownloadData dl) throws IOException {
//
//        String pathname = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS) + "/site/downloading/" + name;
//        for (int i = 1; i <= count; i++) {
//
//            String newLink = "https://hentaifox.com/g/"+id+"/"+i;
//            Document doc = ScrapperFunctions.getDoc(newLink);
//
//            // find image link,
//
//            Element gimg = ScrapperFunctions.getElementid(doc, "gimg");
//            String imgLink = gimg.attr("data-src");
//            // download image
//
//            name=name.trim();
//            URL url = new URL(imgLink);
////            ReadableByteChannel readableByteChannel = Channels.newChannel(url.openStream());
//
//            new File(pathname).mkdir();
//
//            BufferedInputStream in = new BufferedInputStream(url.openStream());
//            FileOutputStream fileOutputStream = new FileOutputStream(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS) + "/site/downloading/"+name+"/"+name+"_"+i+".png");
//            byte dataBuff[] = new byte[1024];
//            int bytesRead;
//            while ((bytesRead = in.read(dataBuff, 0, 1024)) != -1) {
//                fileOutputStream.write(dataBuff, 0, bytesRead);
//            }
//
//            fileOutputStream.close();
//            in.close();
//
////            File web = new File("F:\\site\\downloading\\"+name+"\\"+name+""+i+".png");
//            String webs = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS) + "/site/downloading/"+name+"/"+name+"_"+i+".png";
//            File jpg = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS) + "/site/downloading/"+name+"/"+name+"_"+i+".jpg");
////
////
////            BufferedImage image = ImageIO.read(web);
//            Bitmap bimage = BitmapFactory.decodeFile(webs);
//            if (bimage != null) {
////                ImageIO.write(image, "jpg", jpg);
//              FileOutputStream outputStream = new FileOutputStream(jpg);
//              bimage.compress(Bitmap.CompressFormat.JPEG,100, outputStream);
//              outputStream.close();
//            } else {
//            }
//
//
//            int res = (  (i*100) /count);
//            dl.setProgress( res);
//
//
//
////            FileOutputStream fileOutputStream = new FileOutputStream("F:\\site\\downloading\\"+name+"\\"+name+""+i+".png");
////            FileChannel fileChannel = fileOutputStream.getChannel();
////            fileChannel.transferFrom(readableByteChannel, 0, Long.MAX_VALUE);
////            fileChannel.close();
////            readableByteChannel.close();
////            fileOutputStream.close();
//
//
//        }
//
//
//        return pathname;
//
//        // download image
//
//        // find next page link
//
//
//    }
}
