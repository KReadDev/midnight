package com.personal.manga.service;

import com.personal.manga.domain.PageLink;
import com.personal.manga.domain.SiteManga;
import com.personal.manga.scrapper.FoxScrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class fxService implements siteService{


    private final FoxScrapper foxScrapper;

//    public siteService(FoxScrapper foxScrapper) {
//        this.foxScrapper = foxScrapper;
//    }

    public List<SiteManga> getSiteMangas(String link){
        if (link == "") {
            link = foxScrapper.getLink();
        }
        return foxScrapper.getMangas(link);
    }

    public List<SiteManga> getTerm(String term){

//        if(term.contains(", ")){
            term =term.replace(",","%2C").replace(" ","+");
//        }

        return foxScrapper.getMangas("https://hentaifox.com/search/?q="+term);
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
        return foxScrapper.getMangaDetails(link,id);
    }

    public void dowload(String id,SiteManga manga){
        String link = foxScrapper.getLink()+"/gallery/"+id;
        foxScrapper.getMangaImages(link,id,manga);
    }
}
