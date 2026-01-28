package com.personal.manga.service;

import com.personal.manga.domain.Gallery;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;


public class GalleryReader {

    public static void createGallery(Gallery gallery){
        Reader reader;
        try {
            reader = new FileReader("F:\\site\\info\\Gallery.json");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        JSONTokener tokener = new JSONTokener(reader);
        JSONArray array =new JSONArray(tokener);

        gallery.setId(String.valueOf(array.length()+1));
        JSONObject jsonObject = new JSONObject(gallery);
        array.put(jsonObject);

        try {
            FileWriter mJsonFile = new FileWriter("F:\\site\\info\\Gallery.json");
            mJsonFile.write(array.toString());
            mJsonFile.flush();
            mJsonFile.close();
            reader.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


    }

    public static List<Gallery> getGalleries(){
        Reader reader;
        try {
            reader = new FileReader("F:\\site\\info\\Gallery.json");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        JSONTokener tokener = new JSONTokener(reader);
        JSONArray array =new JSONArray(tokener);

        List<Gallery> galleryList = new ArrayList<>();
        Gallery all = new Gallery("0","All Manga",new ArrayList<>(),true,0);
        galleryList.add(all);

        for (int i = 0; i < array.length(); i++) {
            JSONObject o = array.getJSONObject(i);
            Gallery gallery = new Gallery();
            gallery.setId(o.getString("id"));
            gallery.setName(o.getString("name"));
            gallery.setDefault(o.getBoolean("default"));
//            gallery.setMangaIds();

            JSONArray ids = o.getJSONArray("mangaIds");
            List<String> idList = new ArrayList<>();
            for (int id = 0; id < ids.length(); id++) {
                idList.add(ids.getString(id));
            }
            gallery.setMangaIds(idList);
            gallery.setCount(gallery.getMangaIds().size());
            galleryList.add(gallery);

        }

        return galleryList;
    }

    public static void  addToGallery(Gallery gallery){
        Reader reader;
        try {
            reader = new FileReader("F:\\site\\info\\Gallery.json");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        JSONTokener tokener = new JSONTokener(reader);
        JSONArray array =new JSONArray(tokener);

        for (int i = 0; i < array.length(); i++) {
            JSONObject object = array.getJSONObject(i);

            if(object.getString("id").equals(gallery.getId())){
                array.remove(i);
            }
        }

        JSONObject jsonObject = new JSONObject(gallery);
        array.put(jsonObject);

        try {
            FileWriter mJsonFile = new FileWriter("F:\\site\\info\\Gallery.json");
            mJsonFile.write(array.toString());
            mJsonFile.flush();
            mJsonFile.close();
            reader.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

//    same functiona as above
//    public static void removeFromGallery(Gallery)


}
