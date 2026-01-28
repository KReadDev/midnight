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
import com.personal.manga.scrapper.DownloadWorkerNh;
import com.personal.manga.scrapper.NhScrapper;
import com.personal.manga.scrapper.Scrapper;
import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;

import java.util.List;

//@Service
@RequiredArgsConstructor
public class nhService implements siteService{

    private final NhScrapper nhScrapper;

  public nhService() {
    this.nhScrapper = new NhScrapper();
  }

  public List<PageLink> getPageLinks(String link){
        if (link == "") {
            link = nhScrapper.getLink();
        }
        link =link.replace(",","%2C").replace(" ","+");


        return nhScrapper.getpageLinks(link);
    }

    public List<SiteManga> getSiteMangas(String link){
        if(link == ""){
            link = nhScrapper.getLink();
        }
        return  nhScrapper.getMangas(link);
    }

    public List<SiteManga> getTerm(String term){

        term =term.replace(",","%2C").replace(" ","+");

        return nhScrapper.getMangas(term);
    }

    public List<SiteManga> getMangasByTag(String link){
        if(link.contains(" ")){
            link = link.replace(" ","-");
        }

        return nhScrapper.getMangas(nhScrapper.getLink()+"tag/"+link+"/");
    }

    public SiteManga getSiteManga(String id){
        String link = nhScrapper.getLink()+"/g/"+id;
//        foxScrapper.getMangaImages(link,id);
        return nhScrapper.getMangaDetails(link,id);
    }

  @Override
  public void dowload(String id, SiteManga manga, Context context) {
    String link = nhScrapper.getLink()+"/g/"+id;
//        foxScrapper.getMangaImages(link,id,manga);

    Gson gson = new Gson();


    try {

      Data data = new Data.Builder()
        .putString("link",link)
        .putString("id",id)
        .putString("manga",gson.toJson(manga))
        .build();

      OneTimeWorkRequest workRequest = new OneTimeWorkRequest.Builder(DownloadWorkerNh.class)
        .setInputData(data)
//      .addTag("mangaDownload")
        .build();

      WorkManager.getInstance(context).enqueueUniqueWork(manga.name, ExistingWorkPolicy.KEEP,workRequest);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }

  }

  public void dowload(String id,SiteManga manga){
        String link = nhScrapper.getLink()+"/g/"+id;
        nhScrapper.getMangaImages(link,id,manga);
    }
}
