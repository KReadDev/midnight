package com.personal.manga.service;

import com.personal.manga.domain.Manga;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MangaService {

    public List<Manga> getMangas(){

        return MangaReader.readMangaJson();
    }

    public void bookmarkManga(Manga manga){
        MangaReader.bookMarkManga(manga);

    }

}
