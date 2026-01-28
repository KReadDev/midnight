package com.personal.manga.scrapper;

import com.personal.manga.domain.Manga;
//import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class Serializer {

    public static synchronized void writeManga(Manga manga){
        Reader reader;
        try {
            reader = new FileReader("F:\\site\\info\\Mangas.json");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        JSONTokener tokener = new JSONTokener(reader);
        JSONArray array =new JSONArray(tokener);


        manga.setId(String.valueOf(array.length()+1));
        JSONObject moJson = new JSONObject(manga);
        array.put(moJson);

        try {
            FileWriter mJsonFile = new FileWriter("F:\\site\\info\\Mangas.json");
            mJsonFile.write(array.toString());
            mJsonFile.flush();
            mJsonFile.close();
            reader.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


    }
}
