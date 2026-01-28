package com.personal.manga.domain;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Site {
    public String id;
    public String name;
    public String icon;

  public Site(String id, String name, String icon) {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }

  //    public Site(String number, String fox, String icon) {
//    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}
