package com.personal.manga.plugins;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.gson.Gson;
import com.personal.manga.domain.Manga;
import com.personal.manga.service.MangaService;

import org.json.JSONException;

import java.util.Objects;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

@CapacitorPlugin(name = "Manga")
//@RequiredArgsConstructor
public class MangaPlugin extends Plugin {

  private final MangaService mangaService;

  public MangaPlugin() {
    this.mangaService =new MangaService();
  }

  @PluginMethod()
  public void getAllManga(PluginCall call){

    JSArray mangas = new JSArray();
    for (Manga mangaServiceMangas : mangaService.getMangas()) {
      mangas.put(PluginHelper.getJsObject(mangaServiceMangas));
    }
    JSObject manga = new JSObject();
    manga.put("manga",mangas);
    call.resolve(manga);
  }

  @PluginMethod()
  public void getMangaById(PluginCall call){
    String id = call.getString("id");
    Manga m = mangaService.getMangas().stream().filter(manga -> Objects.equals(manga.getId(), id)).collect(Collectors.toList()).get(0);
    JSObject manga =new JSObject();
//    JSObject manga = new JSObject();
    manga.put("manga", PluginHelper.getJsObject(m));
    call.resolve(manga);
  }

  @PluginMethod()
  public void bookmark(PluginCall call) throws JSONException {
    JSObject manga = call.getObject("manga");
    Gson gson = new Gson();

    Manga m = gson.fromJson(manga.getJSONObject("object").toString(),Manga.class);

//    m.setId(manga.getString("id"));

    mangaService.bookmarkManga(m);
    call.resolve();

  }

  @PluginMethod()
  public void deleteManga(PluginCall call) throws JSONException {
    JSObject manga = call.getObject("manga");

    Gson gson = new Gson();

    Manga m = gson.fromJson(manga.getJSONObject("object").toString(),Manga.class);

    mangaService.deleteManga(m);

    call.resolve();

  }

  @PluginMethod()
  public void reorderManga(PluginCall call){
    mangaService.reordermanga();
    call.resolve();
  }

}
