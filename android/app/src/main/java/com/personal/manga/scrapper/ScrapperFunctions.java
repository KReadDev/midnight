
package com.personal.manga.scrapper;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

public class ScrapperFunctions {

    public static Document getDoc(String link)  {
        try {
            return Jsoup.connect(link).userAgent("Mozilla").get();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static Elements getElements(Element elem, String type, String name){
        if(type == "class"){
            return elem.getElementsByClass(name);
        }
        if(type == "attr"){
            return elem.getElementsByAttribute(name);
        }
        return elem.getElementsByTag(name);

    }

    public static Element getElementid(Element elem, String id){
        return elem.getElementById(id);
    }

    public static Element getElementAtIndex(Element elem, String type, String name,int index){
        Elements indexElem;
        if(type == "class"){
            indexElem = elem.getElementsByClass(name);
        }else if(type == "attr"){
            indexElem = elem.getElementsByAttribute(name);
        }else{
            indexElem = elem.getElementsByTag(name);
        }


        return indexElem.get(index);

    }


    public static void LoopSteps(){

    }
}
//
