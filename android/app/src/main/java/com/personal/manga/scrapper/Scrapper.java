package com.personal.manga.scrapper;

import com.personal.manga.domain.PageLink;
import com.personal.manga.domain.SiteManga;

import java.util.List;

public interface Scrapper {
    public String getLink();
    public List<SiteManga> getMangas(String sitelink);
    public List<PageLink> getpageLinks(String sitelink);
    public SiteManga getMangaDetails(String sitelink,String id);
    public void getMangaImages(String sitelink,String id,SiteManga manga);
}
