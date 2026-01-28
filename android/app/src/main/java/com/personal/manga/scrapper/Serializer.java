package com.personal.manga.scrapper;

import android.os.Environment;

import com.google.gson.Gson;
import com.personal.manga.domain.Constants;
import com.personal.manga.domain.Manga;
//import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Serializer {

    public static synchronized void writeManga(Manga manga){
      try {


        String path = Constants.location+ "info/Manga.json";
        FileInputStream fis = new FileInputStream(path);
        InputStreamReader is = new InputStreamReader(fis);


        BufferedReader br = new BufferedReader(is);
        StringBuilder bl = new StringBuilder();
        String line = br.readLine();
        while (line != null){
          bl.append(line);
          line= br.readLine();
        }
        br.close();
        is.close();
        fis.close();

        JSONTokener tokener = new JSONTokener(bl.toString());
        if(bl.toString()==""){
          tokener = new JSONTokener("[]");
        }
        JSONArray array = new JSONArray(tokener);

//        if(manga.getId()==null || bl.toString().contains(manga.getId())){
          manga.setId(String.valueOf(array.length() + 1));

//        }
        Gson gson = new Gson();
        String json = gson.toJson(manga);
        JSONObject moJson = new JSONObject(json);
//        moJson = ne
//        array.
        array.put(moJson);

        try {
//          FileWriter mJsonFile = new FileWriter("F:\\site\\info\\Mangas.json");
//          mJsonFile.write(array.toString());
//          mJsonFile.flush();
//          mJsonFile.close();
//          reader.close();
          FileOutputStream outputStream = new FileOutputStream(path);
          OutputStreamWriter outputStreamWriter = new OutputStreamWriter(outputStream);
          outputStreamWriter.write(array.toString());
          outputStreamWriter.flush();
          outputStreamWriter.close();
          outputStream.close();
        } catch (IOException e) {
          throw new RuntimeException(e);
        }
      } catch (Exception e){
        throw new RuntimeException(e);
      }


    }
}
