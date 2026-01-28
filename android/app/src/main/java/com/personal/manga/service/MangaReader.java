package com.personal.manga.service;

import com.personal.manga.domain.Manga;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class MangaReader {

    public static List<Manga> readMangaJson(){
        Reader reader;
        try {
            reader = new FileReader("F:\\site\\info\\Mangas.json");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        JSONTokener tokener = new JSONTokener(reader);
        JSONArray array =new JSONArray(tokener);

        List<Manga> mangas = new ArrayList<>();


        for (int i = 0; i < array.length(); i++) {
            JSONObject o = array.getJSONObject(i);
            Manga m = new Manga();
            m.setId((String) o.get("id"));
            m.setName(o.getString("name"));
            m.setPages(o.getInt("pages"));
            m.setBookmarked(o.getBoolean("bookmarked"));

            JSONArray tags = o.getJSONArray("tags");
            List<String> mTags = new ArrayList<>();

            for(Object tag: tags){
                mTags.add((String) tag);
            }
            m.setTags(mTags);
            m.setCover("http://10.0.0.112:8080/images/"+m.getName()+".jpg");

            mangas.add(m);
        }

        return mangas;
    }

    public static void bookMarkManga(Manga manga){

//        System.out.println("manga = " + manga);

        Reader reader;
        try {
            reader = new FileReader("F:\\site\\info\\Mangas.json");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        JSONTokener tokener = new JSONTokener(reader);
        JSONArray array =new JSONArray(tokener);

        List<Manga> mangas = new ArrayList<>();


        for (int i = 0; i < array.length(); i++) {
            JSONObject o = array.getJSONObject(i);
            Manga m = new Manga();
            m.setId((String) o.get("id"));
            m.setName(o.getString("name"));
            m.setPages(o.getInt("pages"));
            if(Objects.equals(m.getId(), manga.getId())){
                m.setBookmarked(manga.isBookmarked());

            }else {
                m.setBookmarked(o.getBoolean("bookmarked"));
            }

            JSONArray tags = o.getJSONArray("tags");
            List<String> mTags = new ArrayList<>();
            for(Object tag: tags){
                mTags.add((String) tag);
            }
            m.setTags(mTags);
//            m.setCover("http://10.0.0.112:8080/images/"+m.getName()+".jpg");

            mangas.add(m);
        }

        JSONArray nArray  = new JSONArray(mangas);

        try {
            FileWriter mJsonFile = new FileWriter("F:\\site\\info\\Mangas.json");
            mJsonFile.write(nArray.toString());
            mJsonFile.flush();
            mJsonFile.close();
            reader.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
