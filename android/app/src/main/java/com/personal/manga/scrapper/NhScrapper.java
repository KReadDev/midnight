package com.personal.manga.scrapper;

import com.personal.manga.domain.DownloadData;
import com.personal.manga.domain.Manga;
import com.personal.manga.domain.PageLink;
import com.personal.manga.domain.SiteManga;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
//import org.springframework.stereotype.Service;
//
//import javax.imageio.ImageIO;
//import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

//@Service
public class NhScrapper {

    private final String link = "https://nhentai.net";

    public String getLink() {
        return link;
    }

    public List<SiteManga> getMangas(String sitelink)  {
        Document doc = ScrapperFunctions.getDoc(sitelink);

        Element container = ScrapperFunctions.getElementAtIndex(doc, "class", "index-container", 0);

        if(container.hasClass("index-popular")){
          container = ScrapperFunctions.getElementAtIndex(doc, "class", "index-container", 1);
        }
        Elements galleries = ScrapperFunctions.getElements(container, "class", "gallery");

        List<SiteManga> mangaList = new ArrayList<>();

        for (Element gallery : galleries) {

            Element img = ScrapperFunctions.getElementAtIndex(gallery, "tag", "img", 0);
            String imgLink = "https:"+ img.attr("data-src");

            Element caption = ScrapperFunctions.getElementAtIndex(gallery, "class", "caption", 0);
            String name = caption.text();

            Element atag = ScrapperFunctions.getElementAtIndex(gallery, "tag", "a", 0);
            String href = atag.attr("href");
            String id = href.replace("/g/","").replace("/","");

          SiteManga manga = new SiteManga(id,name,imgLink);
            mangaList.add(manga);

        }

        return mangaList;

    }

    public List<PageLink> getpageLinks(String sitelink) {
        Document doc = ScrapperFunctions.getDoc(sitelink);

        try {
            Element pagination = ScrapperFunctions.getElementAtIndex(doc,"class","pagination",0);
            Elements pages = ScrapperFunctions.getElements(pagination,"class","page");

            List<PageLink> links = new ArrayList<>();

            for (Element page : pages) {
              String link = "//nhentai.net"+page.attr("href");
              if(page.hasClass("current")){
                link = "#";
              }
                String number = page.text();
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

        Element info = ScrapperFunctions.getElementid(doc, "info");

        // name
        Element title = ScrapperFunctions.getElementAtIndex(info, "class", "title", 0);
        String h1Name = ScrapperFunctions.getElementAtIndex(title, "class", "pretty", 0).text();
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

        Elements tagContainers = ScrapperFunctions.getElements(info, "class", "tag-container");

        Elements tags = new Elements();
        for (Element tagContainer : tagContainers) {
            String textnode = tagContainer.textNodes().get(0).text();
            if(textnode.contains("Tags:")){
                tags = ScrapperFunctions.getElements(tagContainer,"class","tag");
                break;
            }
        }

        List<String> tagList = new ArrayList<>();
        for (Element tag : tags) {
            Element nameElem = ScrapperFunctions.getElementAtIndex(tag, "class", "name", 0);
            String tagName = nameElem.textNodes().get(0).text().trim();
            tagList.add(tagName);
        }

        //pages
        String pages = "";
        for (Element tagContainer : tagContainers) {
            String textnode = tagContainer.textNodes().get(0).text();
            if(textnode.contains("Pages:")){
                pages = ScrapperFunctions.getElementAtIndex(tagContainer, "class", "name", 0).text();
                break;
            }
        }

        Element appendThumbs = ScrapperFunctions.getElementid(doc,"thumbnail-container");
        Elements gThumbs  = ScrapperFunctions.getElements(appendThumbs,"class","thumb-container");

        List<String> coverLinks = new ArrayList<>();
        for (Element gThumb : gThumbs) {
            String dataSrc = "https:"+ ScrapperFunctions.getElementAtIndex(gThumb, "tag", "img", 0).attr("data-src");
            coverLinks.add(dataSrc);

        }

        SiteManga siteManga = new SiteManga(id,name,coverLink,Integer.parseInt(pages),tagList,coverLinks);
        return  siteManga;

    }

    public String getCover(Element doc){
        Element cover = ScrapperFunctions.getElementid(doc, "cover");
        String coverLink ="https:"+ ScrapperFunctions.getElementAtIndex(cover, "tag", "img", 0).attr("data-src");
        return coverLink;
    }

    public void getMangaImages(String sitelink,String id,SiteManga manga) {

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

//        try {
//            location = downloadManga(id, manga.getPages(), manga.getName(),dl);
//        } catch (IOException e) {
//            dl.setError("failed to download: "+e.getMessage() );
//            throw new RuntimeException(e);
//        }

        Manga manga1 = new Manga();

        manga1.setName(manga.getName());
        manga1.setTags(manga.getTags());
        manga1.setPages(manga.getPages());
        manga1.setBookmarked(false);

//        converter.convertToPdf(location,manga.getName());

        String coverlink = getCover(doc);

        URL url = null;
        try {
            url = new URL(coverlink);
            new File("F:\\site\\covers").mkdir();
            BufferedInputStream in = new BufferedInputStream(url.openStream());
            FileOutputStream fileOutputStream = new FileOutputStream("F:\\site\\covers\\"+manga.getName()+".jpg");
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

//    private String downloadManga(String id, int count, String name, DownloadData dl) throws IOException {
//
//        String pathname = "F:\\site\\downloading\\" + name;
//        for (int i = 1; i <= count; i++) {
//            String newLink = "https://nhentai.net/g/"+id+"/"+i;
//            Document doc = ScrapperFunctions.getDoc(newLink);
//
//            Element gimg = ScrapperFunctions.getElementid(doc, "image-container");
//            String imgLink = "https:"+ ScrapperFunctions.getElementAtIndex(gimg, "tag", "img", 0).attr("data-src");
//
//            name=name.trim();
//            URL url = new URL(imgLink);
//
//            new File(pathname).mkdir();
//
//            BufferedInputStream in = new BufferedInputStream(url.openStream());
//            FileOutputStream fileOutputStream = new FileOutputStream("F:\\site\\downloading\\"+name+"\\"+name+""+i+".png");
//            byte dataBuff[] = new byte[1024];
//            int bytesRead;
//            while ((bytesRead = in.read(dataBuff, 0, 1024)) != -1) {
//                fileOutputStream.write(dataBuff, 0, bytesRead);
//            }
//
//            fileOutputStream.close();
//            in.close();
//
//            File web = new File("F:\\site\\downloading\\"+name+"\\"+name+""+i+".png");
//            File jpg = new File("F:\\site\\downloading\\"+name+"\\"+name+"_"+i+".jpg");
//
//
//            BufferedImage image = ImageIO.read(web);
//            if (image != null) {
//                ImageIO.write(image, "jpg", jpg);
//            } else {
//            }
//
//            int res = (  (i*100) /count);
//            dl.setProgress( res);
//        }
//
//        return pathname;
//
//    }


}
