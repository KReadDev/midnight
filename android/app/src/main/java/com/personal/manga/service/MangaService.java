package com.personal.manga.service;

import com.personal.manga.domain.Manga;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;

import java.util.List;

//@Service
//@RequiredArgsConstructor
public class MangaService {

    public static List<Manga> getMangas(){

        return MangaReader.readMangaJson();
    }

    public static void bookmarkManga(Manga manga){
        MangaReader.bookMarkManga(manga);

    }

    public static void deleteManga(Manga manga){
      MangaReader.deleteManga(manga);
    }

    public static void reordermanga(){
      MangaReader.reorder();
    }

}
