package com.personal.manga.plugins;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.gson.Gson;
import com.personal.manga.scrapper.DownloadSingleton;

import org.json.JSONException;

@CapacitorPlugin(name = "Download")
public class DownloadPlugin extends Plugin {

  @PluginMethod
  public void getAllDownloads(PluginCall call) throws JSONException {
    DownloadSingleton instance = DownloadSingleton.getInstance();

    Gson gson = new Gson();
    JSArray object = new JSArray(gson.toJson(instance.downloads));

    JSObject obj = new JSObject();

    obj.put("downloads",object);
    call.resolve(obj);

  }




}
