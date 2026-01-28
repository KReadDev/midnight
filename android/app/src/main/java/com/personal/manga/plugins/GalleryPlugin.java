package com.personal.manga.plugins;

import android.Manifest;
import android.os.Build;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import com.google.gson.Gson;
import com.personal.manga.domain.Gallery;
//import com.personal.manga.domain.Manga;
import com.personal.manga.domain.Manga;
import com.personal.manga.service.GalleryService;
import com.personal.manga.service.MangaService;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@CapacitorPlugin(name = "Gallery",
  permissions = {
    @Permission(alias = "json",
      strings = {Manifest.permission.MANAGE_EXTERNAL_STORAGE})
  })
public class GalleryPlugin extends Plugin {



  @PluginMethod()
  public void getAllGalleries(PluginCall call) {
//    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
//      if(getPermissionState("json") != PermissionState.GRANTED){
//        requestPermissionForAlias("json",call,"jsonPermCallback");
//      }else {

    JSArray arr = new JSArray();
    for (Gallery gallery : GalleryService.getGalleries()) {
      arr.put(getJsObject(gallery));
    }

    JSObject gals = new JSObject();
//    JSObject gal = new JSObject();
//    List<String> array = new ArrayList<>();
//    array.add("12");
//    array.add("2");
////    array.add("12");
//
//    gal.put("id","2");
//    gal.put("name","All");
//    gal.put("mangaIds",array);
//    gal.put("count",2);
//    arr.put(gal);

    gals.put("galleries", arr);
//    gals.put("galleries", "12345a");
    call.resolve(gals);
//      }
//    }
  }

  @PluginMethod
  public void getGalleryById(PluginCall call){
    String id = call.getString("id");
    JSArray arr = new JSArray();
    if(id.equals("0")){
      for (Manga mangas : MangaService.getMangas()) {
        arr.put(PluginHelper.getJsObject(mangas));
      }
    }else{
      Gallery gal = GalleryService.getGalleries().stream().filter(gallery -> gallery.getId().equals(id)).collect(Collectors.toList()).get(0);
      List<Manga> collect = MangaService.getMangas().stream().filter(manga -> gal.getMangaIds().contains(manga.getId())).collect(Collectors.toList());
      for (Manga manga : collect) {
        arr.put(PluginHelper.getJsObject(manga));
      }
    }
    JSObject obj = new JSObject();
    obj.put("mangas",arr);
    call.resolve(obj);
//    Manga m = MangaService.getMangas().stream().filter(manga -> Objects.equals(manga.getId(), id)).collect(Collectors.toList()).get(0);
//    JSObject manga = PluginHelper.getJsObject(m);
  }

  @PluginMethod
  public void addToGallery(PluginCall call){
    String id = call.getString("id");
    String mangaid = call.getString("mangaid");
    Gallery gal = GalleryService.getGalleries().stream().filter(gallery -> gallery.getId().equals(id)).collect(Collectors.toList()).get(0);
    List<String> ids =gal.getMangaIds();
    if(!ids.contains(mangaid)){
      ids.add(mangaid);
      GalleryService.addToGallery(gal);
    }
    call.resolve();
  }

  @PluginMethod
  public void createGallery(PluginCall call) throws JSONException {
    Gson gson = new Gson();
    JSObject gallery = call.getObject("gallery");

    JSONObject object = gallery.getJSONObject("object");


//    object.toString()

    GalleryService.createGallery(gson.fromJson(object.toString(),Gallery.class));

    JSArray arr = new JSArray();
    for (Gallery galler : GalleryService.getGalleries()) {
      arr.put(getJsObject(galler));
    }
    JSObject gals = new JSObject();
    gals.put("galleries", arr);
    call.resolve(gals);

//    call.resolve();
  }




  private JSObject getJsObject(Object object) {
    JSObject obj = new JSObject();
    Field[] declaredFields = object.getClass().getDeclaredFields();
//    String declaredField = object.getClass().getDeclaredFields()[0].getName();

    for (Field field : declaredFields) {
      try {
        if (field.getType() == List.class) {
//        field.get(object);

          JSArray arr = new JSArray(((List) field.get(object)).toArray());
//          JSObject array = new JSObject();
          obj.put(field.getName(), arr);


        } else {

          obj.put(field.getName(),
            field.get(object));

        }
      } catch (JSONException | IllegalAccessException e) {
        throw new RuntimeException(e);
      }
    }

    return obj;

  }



}
