package com.personal.manga.plugins;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;

import org.json.JSONException;

import java.lang.reflect.Field;
import java.util.List;

public class PluginHelper {

  // time waister
  public static JSObject getJsObject(Object object) {
    JSObject obj = new JSObject();
//    object.getClass().
    Field[] declaredFields = object.getClass().getDeclaredFields();
//    String declaredField = object.getClass().getDeclaredFields()[0].getName();

    for (Field field : declaredFields) {
      try {
        if (field.getType() == List.class) {
//        field.getc;
          List list = ((List) field.get(object));
          if(list != null){

            JSArray arr = new JSArray(((List) field.get(object)).toArray());
//          JSObject array = new JSObject();
            obj.put(field.getName(), arr);
          }


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
