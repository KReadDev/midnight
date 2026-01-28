package com.personal.manga.service;

import com.personal.manga.domain.PageLink;
import com.personal.manga.domain.SiteManga;
import com.personal.manga.scrapper.NhScrapper;
import com.personal.manga.scrapper.Scrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class nhService implements siteService{

    private final NhScrapper nhScrapper;

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
        System.out.println("link = " + link);
        return  nhScrapper.getMangas(link);
    }

    public List<SiteManga> getTerm(String term){

        term =term.replace(",","%2C").replace(" ","+");

        return nhScrapper.getMangas("https://nhentai.net/search/?q="+term);
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

    public void dowload(String id,SiteManga manga){
        String link = nhScrapper.getLink()+"/g/"+id;
        nhScrapper.getMangaImages(link,id,manga);
    }
}
