package com.personal.manga.service;

import android.content.Context;

import com.personal.manga.domain.PageLink;
import com.personal.manga.domain.SiteManga;

import java.util.List;

public interface siteService {
    List<SiteManga> getSiteMangas(String link);
    public List<SiteManga> getTerm(String term);
    public List<SiteManga> getMangasByTag(String link);
    public List<PageLink> getPageLinks(String link);
    public SiteManga getSiteManga(String id);
    public void dowload(String id, SiteManga manga, Context context);
}
