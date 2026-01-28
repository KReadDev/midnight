package com.personal.manga.domain;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class Manga {
    private String id;
    private String name;
    private List<String> tags;
    private String cover;
    private int pages;
    private boolean isBookmarked;
    private Date lastRead;
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

    public boolean isBookmarked() { return isBookmarked; }
    public void setBookmarked(boolean bookmarked) { isBookmarked = bookmarked; }

    public Date getLastRead() { return lastRead; }
    public void setLastRead(Date lastRead) { this.lastRead = lastRead; }

    @Override
    public String toString() {
        return "Manga{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", tags=" + tags +
                ", cover='" + cover + '\'' +
                ", pages=" + pages +
                ", isBookmarked=" + isBookmarked +
                ", lastRead=" + lastRead +
                '}';
    }
}
