package com.personal.manga.domain;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class SiteManga {



    public String id;
    public String name;
    public String cover;
    public int pages;
    public List<String> tags;
    public List<String> pagesLinks;

    public SiteManga(String id, String name, String cover) {
        this.id = id;
        this.name = name;
        this.cover = cover;

    }

    public SiteManga(String id, String name, String cover, int pages, List<String> tags,List<String> pagesLinks) {
        this.id = id;
        this.name = name;
        this.cover = cover;
        this.pages = pages;
        this.tags = tags;
        this.pagesLinks = pagesLinks;

    }

  public SiteManga(String id, String name, String cover, int pages, List<String> tags) {
    this.id = id;
    this.name = name;
    this.cover = cover;
    this.pages = pages;
    this.tags = tags;
  }

  // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCover() { return cover; }
    public void setCover(String cover) { this.cover = cover; }

    public int getPages() { return pages; }
    public void setPages(int pages) { this.pages = pages; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public List<String> getPagesLinks() {
        return pagesLinks;
    }

    public void setPagesLinks(List<String> pagesLinks) {
        this.pagesLinks = pagesLinks;
    }

  @Override
  public String toString() {
    return "SiteManga{" +
      "id='" + id + '\'' +
      ", name='" + name + '\'' +
      ", cover='" + cover + '\'' +
      ", pages=" + pages +
      ", tags=" + tags +
      ", pagesLinks=" + pagesLinks +
      '}';
  }
}
