package com.personal.manga.service;


import androidx.annotation.NonNull;

import com.google.gson.Gson;
import com.personal.manga.domain.Constants;
import com.personal.manga.domain.Gallery;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;


import java.io.*;
import java.util.ArrayList;
import java.util.List;


public class GalleryReader {

  static String pathname = Constants.location+"info/Gallery.json";

  public static void createGallery(Gallery gallery) {
    try {

      FileInputStream fis = new FileInputStream(pathname);
      InputStreamReader is = new InputStreamReader(fis);

      BufferedReader br = new BufferedReader(is);
      StringBuilder bl = new StringBuilder();
      String line = br.readLine();
      while (line != null) {
        bl.append(line);
        line = br.readLine();
      }
      br.close();
      is.close();
      fis.close();

      JSONTokener tokener = new JSONTokener(bl.toString());
      if (bl.toString()==""){
        tokener = new JSONTokener("[]");
      }
      JSONArray array = new JSONArray(tokener);

      gallery.setId(String.valueOf(array.length() + 1));
      Gson gson = new Gson();
      JSONObject jsonObject = new JSONObject(gson.toJson(gallery));
      array.put(jsonObject);

      try {
        FileOutputStream ops = new FileOutputStream(pathname);
        OutputStreamWriter opsw = new OutputStreamWriter(ops);
        opsw.write(array.toString());
        opsw.flush();
        opsw.close();
        ops.close();
//        reader.close();
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    } catch (JSONException e) {
      throw new RuntimeException(e);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }


  }

  public static List<Gallery> getGalleries() {
    try {

//      Reader reader;

//        reader = new FileReader("F:\\site\\info\\Gallery.json");

//        reader = new FileReader(Environment.getExternalStorageDirectory()+"/Documents/info/Gallery.json");
//        reader = new FileReader(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)+"/info/Gallery.json");
      FileInputStream fis;
//      String location = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS) + "/site/info";
      try {

        fis = new FileInputStream(pathname);
      }catch (FileNotFoundException e){
        File file = new File(Constants.location+"info");
        file.mkdirs();
        file = new File(pathname);
        file.createNewFile();
        fis = new FileInputStream(file);
      }

      InputStreamReader is = new InputStreamReader(fis);


      BufferedReader br = new BufferedReader(is);
      StringBuilder bl = new StringBuilder();
      String line = br.readLine();
      while (line != null) {
        bl.append(line);
        line = br.readLine();
      }
      br.close();
      is.close();
      fis.close();

      List<Gallery> galleryList = getGalleries(bl);

      return galleryList;
    } catch (JSONException e) {
      throw new RuntimeException(e);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @NonNull
  private static List<Gallery> getGalleries(StringBuilder bl) throws JSONException {

//    JSONArray array;
    JSONTokener tokener = new JSONTokener(bl.toString());
    if (bl.toString()==""){
      tokener = new JSONTokener("[]");
    }

    JSONArray array = new JSONArray(tokener);


    List<Gallery> galleryList = new ArrayList<>();
    Gallery all = new Gallery("0", "All Manga", new ArrayList<String>(), 0,true);
//    all.mangaIds.add("2");
    galleryList.add(all);

    for (int i = 0; i < array.length(); i++) {
      JSONObject o = array.getJSONObject(i);
      Gallery gallery = new Gallery();
      gallery.setId(o.getString("id"));
      gallery.setName(o.getString("name"));
//      gallery.setDefault(o.getBoolean("default"));
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

  public static void addToGallery(Gallery gallery) {
    try {
//      String pathname = Constants.location+"info/Gallery.json";
      FileInputStream fis = new FileInputStream(pathname);
      InputStreamReader is = new InputStreamReader(fis);

      BufferedReader br = new BufferedReader(is);
      StringBuilder bl = new StringBuilder();
      String line = br.readLine();
      while (line != null) {
        bl.append(line);
        line = br.readLine();
      }
      br.close();
      is.close();
      fis.close();

      JSONTokener tokener = new JSONTokener(bl.toString());
      JSONArray array = new JSONArray(tokener);

      for (int i = 0; i < array.length(); i++) {
        JSONObject object = array.getJSONObject(i);

        if (object.getString("id").equals(gallery.getId())) {
          array.remove(i);
        }
      }

      Gson gson = new Gson();

      JSONObject jsonObject = new JSONObject(gson.toJson(gallery));
      array.put(jsonObject);

//        FileWriter mJsonFile = new FileWriter("F:\\site\\info\\Gallery.json");
//        mJsonFile.write(array.toString());
//        mJsonFile.flush();
//        mJsonFile.close();
//        reader.close();
        FileOutputStream ops = new FileOutputStream(pathname);
        OutputStreamWriter opsw = new OutputStreamWriter(ops);
        opsw.write(array.toString());
        opsw.flush();
        opsw.close();
        ops.close();

    } catch (JSONException e) {
      throw new RuntimeException(e);
    } catch (FileNotFoundException e) {
      throw new RuntimeException(e);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

//    same functiona as above
//    public static void removeFromGallery(Gallery)


}
