package com.personal.manga.service;

import android.content.Context;

import androidx.work.Data;
import androidx.work.ExistingWorkPolicy;
import androidx.work.OneTimeWorkRequest;
import androidx.work.WorkManager;

import com.google.gson.Gson;
import com.personal.manga.domain.PageLink;
import com.personal.manga.domain.SiteManga;
import com.personal.manga.scrapper.DownloadWorker;
import com.personal.manga.scrapper.FoxScrapper;
import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;

import java.util.List;

//@Service
@RequiredArgsConstructor
public class fxService implements siteService{


    private final FoxScrapper foxScrapper;

  public fxService() {
    this.foxScrapper = new FoxScrapper();
  }

  //    public siteService(FoxScrapper foxScrapper) {
//        this.foxScrapper = foxScrapper;
//    }

    public List<SiteManga> getSiteMangas(String link){
        if (link == "") {
            link = foxScrapper.getLink();
        }
//      foxScrapper.getMangas(link).
        return foxScrapper.getMangas(link);
    }

    public List<SiteManga> getTerm(String term){

//        if(term.contains(", ")){
            term =term.replace(",","%2C").replace(" ","+");
//        }

        return foxScrapper.getMangas(term);
    }

    public List<SiteManga> getMangasByTag(String link){
        if(link.contains(" ")){
            link = link.replace(" ","-");
        }

        return foxScrapper.getMangas("https://hentaifox.com/tag/"+link+"/");
    }

    public List<PageLink> getPageLinks(String link){
        if (link == "") {
            link = foxScrapper.getLink();
        }
        link =link.replace(",","%2C").replace(" ","+");


        return foxScrapper.getpageLinks(link);
    }

    public SiteManga getSiteManga(String id){
        String link = foxScrapper.getLink()+"/gallery/"+id;
//        foxScrapper.getMangaImages(link,id);
      SiteManga mangaDetails = foxScrapper.getMangaDetails(link, id);
      return mangaDetails;
    }

    public void dowload(String id, SiteManga manga, Context context){
        String link = foxScrapper.getLink()+"/gallery/"+id;
//        foxScrapper.getMangaImages(link,id,manga);

      Gson gson = new Gson();

       Data data = new Data.Builder()
        .putString("link",link)
        .putString("id",id)
        .putString("manga",gson.toJson(manga))
        .build();

      OneTimeWorkRequest workRequest = new OneTimeWorkRequest.Builder(DownloadWorker.class)
        .setInputData(data)
        .build();

      WorkManager.getInstance(context).enqueueUniqueWork(manga.name, ExistingWorkPolicy.KEEP,workRequest);


    }


}
