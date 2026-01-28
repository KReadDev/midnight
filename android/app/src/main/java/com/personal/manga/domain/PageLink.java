package com.personal.manga.domain;

public class PageLink {

    private String pageNum;
    private String pageLink;

    public PageLink(String pageNum, String pageLink) {
        this.pageNum = pageNum;
        this.pageLink = pageLink;
    }

    public String getPageNum() {
        return pageNum;
    }

    public void setPageNum(String pageNum) {
        this.pageNum = pageNum;
    }

    public String getPageLink() {
        return pageLink;
    }

    public void setPageLink(String pageLink) {
        this.pageLink = pageLink;
    }
}
