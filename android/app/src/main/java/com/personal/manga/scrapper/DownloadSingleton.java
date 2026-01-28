package com.personal.manga.scrapper;

import com.personal.manga.domain.DownloadData;

import java.util.ArrayList;
import java.util.List;

public class DownloadSingleton {
    private static DownloadSingleton instance = null;

    public List<DownloadData> downloads;

    private DownloadSingleton() {
        this.downloads = new ArrayList<>();
    }

    public static synchronized DownloadSingleton getInstance(){
        if (instance == null){
            instance = new DownloadSingleton();
        }
        return instance;
    }
}
