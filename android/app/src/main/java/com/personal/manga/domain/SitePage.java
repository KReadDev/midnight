package com.personal.manga.domain;

import java.util.List;


public class SitePage {
    private List<PageLink> links;
    private List<SiteManga> manga;

    public SitePage(List<PageLink> links, List<SiteManga> manga) {
        this.links = links;
        this.manga = manga;
    }

    public List<PageLink> getLinks() {
        return links;
    }

    public void setLinks(List<PageLink> links) {
        this.links = links;
    }

    public List<SiteManga> getManga() {
        return manga;
    }

    public void setManga(List<SiteManga> manga) {
        this.manga = manga;
    }
}
