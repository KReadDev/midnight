package com.personal.manga.domain;

import java.util.Date;
import java.util.List;

public class Manga {
    public String id;
    public String name;
    public List<String> tags;
    public String cover;
    public int pages;
    public boolean bookmarked;
    public Date lastRead;

    public String pdf;
//    private coverBytes

    public Manga(){
//        UUID.
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getCover() { return cover; }
    public void setCover(String cover) { this.cover = cover; }

    public int getPages() { return pages; }
    public void setPages(int pages) { this.pages = pages; }

    public boolean isBookmarked() { return bookmarked; }
    public void setBookmarked(boolean bookmarked) { this.bookmarked = bookmarked; }

    public Date getLastRead() { return lastRead; }
    public void setLastRead(Date lastRead) { this.lastRead = lastRead; }

  public String getPdf() {
    return pdf;
  }

  public void setPdf(String pdf) {
    this.pdf = pdf;
  }

  @Override
    public String toString() {
        return "Manga{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", tags=" + tags +
                ", cover='" + cover + '\'' +
                ", pages=" + pages +
                ", isBookmarked=" + bookmarked +
                ", lastRead=" + lastRead +
                '}';
    }
}
