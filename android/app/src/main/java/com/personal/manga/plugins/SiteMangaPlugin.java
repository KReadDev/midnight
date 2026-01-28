package com.personal.manga.plugins;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.personal.manga.domain.SiteManga;
import com.personal.manga.service.fxService;
import com.personal.manga.service.nhService;
import com.personal.manga.service.siteService;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

@CapacitorPlugin(name = "SiteManga")
public class SiteMangaPlugin extends Plugin {

  private final fxService fxService;
  private final nhService nhService;
  private siteService siteService;

  public SiteMangaPlugin() {
    this.fxService = new fxService();
    this.nhService = new nhService();
    siteService = fxService;
//    siteService = new Si
  }

//  public SiteMangaPlugin() {
//    this.siteService = new fxService();
//  }

  @PluginMethod
  public void getSiteMangaById(PluginCall call){
    String id = call.getString("id");
    String mangaid = call.getString("mangaid");
    getSite(Integer.parseInt(id));

    JSObject obj = new JSObject();
    obj.put("siteManga",PluginHelper.getJsObject(siteService.getSiteManga(mangaid)));
    call.resolve(obj);
  }

  @PluginMethod
  public void createSiteManga(PluginCall call) throws JSONException {
    String id1 = call.getString("id");
    getSite(Integer.parseInt(id1));
    JSObject manga = call.getObject("siteManga");
    JSONObject object1 = manga.getJSONObject("object");

    String id = object1.getString("id");
    String name = object1.getString("name");
    String cover = object1.getString("cover");
    int pages = object1.getInt("pages");
    JSONArray tags = object1.getJSONArray("tags");
//    JSONArray pageLinks = object1.getJSONArray("pagesLinks");

    List<String> aTags = new ArrayList<>();
    List<String> aPageLinks = new ArrayList<>();

    for (int i = 0; i < tags.length(); i++) {
      aTags.add(tags.getString(i));
    }

//    for (int i = 0; i < pageLinks.length(); i++) {
//      aPageLinks.add(pageLinks.getString(i));
//    }

    SiteManga siteManga = new SiteManga(id,name,cover,pages,aTags);

    siteService.dowload(id,siteManga,getContext());
    call.resolve();

//    object1.
//    System.out.println("manga.getJSONObject(\"object\") = " + object1); // working
//    SiteManga object = (SiteManga) manga.get("object"); // not working
//    System.out.println("object = " + object);
//    manga.
//    siteService.dowload();

  }

  private void getSite(int site) {
    if(site == 1){
      siteService = fxService;
    }else {
      siteService = nhService;
    }
  }

}
