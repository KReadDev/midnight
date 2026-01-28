package com.personal.manga.plugins;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.gson.Gson;
import com.personal.manga.domain.PageLink;
import com.personal.manga.domain.Site;
import com.personal.manga.domain.SiteManga;
import com.personal.manga.domain.SitePage;
import com.personal.manga.service.fxService;
import com.personal.manga.service.nhService;
import com.personal.manga.service.siteService;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;

@CapacitorPlugin(name = "Site")
public class SitePlugin extends Plugin {

  private final fxService fxService;
  private final nhService nhService;
  private siteService siteService;

  public SitePlugin() {
    this.fxService = new fxService();
    this.nhService = new nhService();
    siteService = fxService;
//    siteService = new Si
  }

  @PluginMethod
  public void getAllSites(PluginCall call){
    List<Site> sites = new ArrayList<>();
    sites.add(new Site("1","hentaifox","icon"));
    sites.add(new Site("2","nhentai","icon"));

    JSArray array = new JSArray();
    for (Site site : sites) {
      array.put(PluginHelper.getJsObject(site));
    }
    JSObject site = new JSObject();
    site.put("sites",array);
    call.resolve(site);
  }

  @PluginMethod
  public void getSiteById(PluginCall call) throws JSONException {

    String id = call.getString("id");
    getSite(Integer.parseInt(id));

//    SitePage dto = new SitePage(siteService.getPageLinks(""),siteService.getSiteMangas(""));
//    JSArray arr1 = new JSArray();
//    for (PageLink pageLink : siteService.getPageLinks("")) {
//      arr1.put(PluginHelper.getJsObject(pageLink));
//    }
//
//    JSArray arr2 = new JSArray();
//    for (SiteManga siteMangas : siteService.getSiteMangas("")) {
//      arr2.put(PluginHelper.getJsObject(siteMangas));
//    }

    Gson gson = new Gson();

    JSObject page = new JSObject();
    page.put("links",new JSArray(gson.toJson(siteService.getPageLinks(""))));
    page.put("manga",new JSArray(gson.toJson(siteService.getSiteMangas(""))));

    JSObject obj = new JSObject();
    obj.put("sitepage", page);
    call.resolve(obj);

  }

  @PluginMethod
  public void getTagFilter(PluginCall call){
    String id = call.getString("id");
    String term = call.getString("term");
    getSite(Integer.parseInt(id));
    String tag = term;
    if(term.contains(" ")){
      tag = term.replace(" ","-");
    }

    if(id.equals("1")){
      term = "https://hentaifox.com/tag/"+term;
    }else {
      term = "https://nhentai.net/tag/"+term+"/";
    }

    JSArray arr1 = new JSArray();
    for (PageLink pageLink : siteService.getPageLinks(term)) {
      arr1.put(PluginHelper.getJsObject(pageLink));
    }

    JSArray arr2 = new JSArray();
    for (SiteManga siteMangas : siteService.getSiteMangas(term)) {
      arr2.put(PluginHelper.getJsObject(siteMangas));
    }

    JSObject page = new JSObject();
    page.put("links",arr1);
    page.put("manga",arr2);

    JSObject obj = new JSObject();
    obj.put("sitepage", page);
    call.resolve(obj);

  }

  @PluginMethod
  public void getSearchTerm(PluginCall call){
    String id = call.getString("id");
    String term = call.getString("term");
    getSite(Integer.parseInt(id));

    https://nhentai.net/search/?q=lol
    if(id.equals("1")){
      term = "https://hentaifox.com/search/?q="+term;
    }else {
      term = "https://nhentai.net/search/?q="+term;
    }

    JSArray arr1 = new JSArray();
    for (PageLink pageLink : siteService.getPageLinks(term)) {
      arr1.put(PluginHelper.getJsObject(pageLink));
    }

    JSArray arr2 = new JSArray();
    for (SiteManga siteMangas : siteService.getTerm(term)) {
      arr2.put(PluginHelper.getJsObject(siteMangas));
    }

    JSObject page = new JSObject();
    page.put("links",arr1);
    page.put("manga",arr2);

    JSObject obj = new JSObject();
    obj.put("sitepage", page);
    call.resolve(obj);

  }

  @PluginMethod
  public void getPagelinks(PluginCall call){
    String id = call.getString("id");
    String pag = call.getString("page");
    getSite(Integer.parseInt(id));

    JSArray arr1 = new JSArray();
    if(id == "1"){
      pag = "https:"+pag;
    }else {

    }
    for (PageLink pageLink : siteService.getPageLinks("https:"+pag)) {
      arr1.put(PluginHelper.getJsObject(pageLink));
    }

    JSArray arr2 = new JSArray();
    for (SiteManga siteMangas : siteService.getSiteMangas("https:"+pag)) {
      arr2.put(PluginHelper.getJsObject(siteMangas));
    }

    JSObject object = new JSObject();
    object.put("links",arr1);
    object.put("manga",arr2);

    JSObject obj = new JSObject();
    obj.put("sitepage", object);
    call.resolve(obj);

  }


  private void getSite(int site) {
    if(site == 1){
      siteService = fxService;
    }else {
      siteService = nhService;
    }
  }

}
