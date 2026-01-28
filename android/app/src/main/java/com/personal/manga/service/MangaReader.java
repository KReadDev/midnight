package com.personal.manga.service;

import android.os.Environment;

import com.google.gson.Gson;
import com.personal.manga.domain.Constants;
import com.personal.manga.domain.Manga;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class MangaReader {

  static String path = Constants.location+"/info/Manga.json";

    public static List<Manga> readMangaJson(){
      try {


//        Reader reader;
//        try {
//          reader = new FileReader("F:\\site\\info\\Mangas.json");
//        } catch (FileNotFoundException e) {
//          throw new RuntimeException(e);
//        }

//        String location = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)+"/site/info/";

//        FileInputStream fis = new FileInputStream(new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)+"/site/info/Mangas.json"));
        FileInputStream fis;
//        String location = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS) + "/site/info";
        try {

          fis = new FileInputStream(path);
        }catch (FileNotFoundException e){
          File file = new File(Constants.location+"info");
          file.mkdirs();
          file = new File(path);
          file.createNewFile();
          fis = new FileInputStream(file);
        }

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
        if (bl.toString()==""){
          tokener = new JSONTokener("[]");
        }
        JSONArray array = new JSONArray(tokener);

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

//          tags

          for (int j = 0;j< tags.length();j++) {
            mTags.add((String) tags.get(j));
          }
          m.setTags(mTags);
          m.setCover(Constants.location+"covers/"+ m.getName() + ".jpg");
          m.setPdf(Constants.location+"pdfs/"+ m.getName() + ".pdf");

          mangas.add(m);
        }

        return mangas;
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    }

    public static void bookMarkManga(Manga manga){
      try {


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
        JSONArray array = new JSONArray(tokener);

//        List<Manga> mangas = new ArrayList<>();


        for (int i = 0; i < array.length(); i++) {
          JSONObject o = array.getJSONObject(i);

          if(o.getString("id").equals(manga.getId())){
            array.remove(i);
          }
//          Manga m = new Manga();
//          m.setId((String) o.get("id"));
//          m.setName(o.getString("name"));
//          m.setPages(o.getInt("pages"));
//          if (Objects.equals(m.getId(), manga.getId())) {
//            m.setBookmarked(manga.isBookmarked());
//
//          } else {
//            m.setBookmarked(o.getBoolean("bookmarked"));
//          }



//          for (Object tag : tags) {
//          for (int j = 0;j< tags.length();j++) {
//            mTags.add((String) tags.get(j));
//          }
//          m.setTags(mTags);
//            m.setCover("http://10.0.0.112:8080/images/"+m.getName()+".jpg");


//          mangas.add(m);
        }

//        JSONArray nArray = new JSONArray(mangas);
        Gson gson = new Gson();

        array.put(new JSONObject(gson.toJson(manga)));

        try {
//          FileWriter mJsonFile = new FileWriter("F:\\site\\info\\Mangas.json");
          FileOutputStream outputStream = new FileOutputStream(path);
          OutputStreamWriter outputStreamWriter = new OutputStreamWriter(outputStream);
          outputStreamWriter.write(array.toString());
          outputStreamWriter.flush();
          outputStreamWriter.close();
          outputStream.close();
//          mJsonFile.write(nArray.toString());
//          mJsonFile.flush();
//          mJsonFile.close();
//          reader.close();
        } catch (IOException e) {
          throw new RuntimeException(e);
        }
      }catch (Exception e){
        throw new RuntimeException(e);
      }
    }


    public static void deleteManga(Manga manga){

      try {
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
        JSONArray array = new JSONArray(tokener);

        String mangaFile = Constants.location+"pdfs/"+ manga.getName() + ".pdf";
        for (int i = 0; i < array.length(); i++) {
          JSONObject o = array.getJSONObject(i);

          if(o.getString("id").equals(manga.getId())){
            array.remove(i);

          }


        }

        FileOutputStream outputStream = new FileOutputStream(path);
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(outputStream);
        outputStreamWriter.write(array.toString());
        outputStreamWriter.flush();
        outputStreamWriter.close();
        outputStream.close();

        boolean delete = true;

        for (Manga manga1 : readMangaJson()) {
          String control = Constants.location+"pdfs/"+ manga1.getName() + ".pdf";
          if(control.equals(mangaFile)){
            delete = false;
            break;

          }
        }

        if( delete){
          File file = new File( mangaFile);
          file.delete();
          File img = new File(Constants.location+"covers/"+ manga.getName() + ".jpg");
          img.delete();
        }

      } catch (FileNotFoundException e) {
        throw new RuntimeException(e);
      } catch (JSONException e) {
        throw new RuntimeException(e);
      } catch (IOException e) {
        throw new RuntimeException(e);
      }

    }

    public static void reorder(){
      try {


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
        JSONArray array = new JSONArray(tokener);

//        List<Manga> mangas = new ArrayList<>();


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

//          tags

          for (int j = 0;j< tags.length();j++) {
            mTags.add((String) tags.get(j));
          }
          m.setTags(mTags);
          m.setCover(Constants.location+"covers/"+ m.getName() + ".jpg");
          m.setPdf(Constants.location+"pdfs/"+ m.getName() + ".pdf");

          mangas.add(m);
        }

        for (int i = 0; i < mangas.size(); i++) {
          mangas.get(i).id = ""+(i+1);

        }



//        JSONArray nArray = new JSONArray(mangas);
        Gson gson = new Gson();

//        gson.to;

        array = new  JSONArray(gson.toJson(mangas));
//        array.put(new JSONObject(gson.toJson(manga)));

        try {
//          FileWriter mJsonFile = new FileWriter("F:\\site\\info\\Mangas.json");
          FileOutputStream outputStream = new FileOutputStream(path);
          OutputStreamWriter outputStreamWriter = new OutputStreamWriter(outputStream);
          outputStreamWriter.write(array.toString());
          outputStreamWriter.flush();
          outputStreamWriter.close();
          outputStream.close();
//          mJsonFile.write(nArray.toString());
//          mJsonFile.flush();
//          mJsonFile.close();
//          reader.close();
        } catch (IOException e) {
          throw new RuntimeException(e);
        }
      }catch (Exception e){
        throw new RuntimeException(e);
      }
    }

}
