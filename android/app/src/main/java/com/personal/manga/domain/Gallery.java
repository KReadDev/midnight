package com.personal.manga.domain;

import java.util.List;

public class Gallery implements Comparable {
    private String id;
    private String name;
    private List<String> mangaIds;
    private boolean isDefault;
    private int count;

    public Gallery(String id, String name, List<String> mangaIds, boolean isDefault, int count) {
        this.id = id;
        this.name = name;
        this.mangaIds = mangaIds;
        this.isDefault = isDefault;
        this.count = count;
    }

    public Gallery() {

    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<String> getMangaIds() { return mangaIds; }
    public void setMangaIds(List<String> mangaIds) { this.mangaIds = mangaIds; }

    public boolean isDefault() { return isDefault; }
    public void setDefault(boolean aDefault) { isDefault = aDefault; }

    public int getCount() { return count; }
    public void setCount(int count) { this.count = count; }

    @Override
    public int compareTo(Object o) {
        Gallery gl = (Gallery) o;
        if (Integer.parseInt(id) < Integer.parseInt(gl.getId())) return -1;
        if (Integer.parseInt(id) > Integer.parseInt(gl.getId())) return 1;
        return 0;
    }
}
