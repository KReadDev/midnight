package com.personal.manga.service;

import com.personal.manga.domain.Gallery;
import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;

import java.util.List;

//@Service
@RequiredArgsConstructor
public class GalleryService {

    public static List<Gallery> getGalleries(){
        return GalleryReader.getGalleries();
    }

    public static List<Gallery> createGallery(Gallery gallery){
        GalleryReader.createGallery(gallery);
        return GalleryReader.getGalleries();
    }

    public static List<Gallery> addToGallery(Gallery gallery){
        GalleryReader.addToGallery(gallery);
        return GalleryReader.getGalleries();
    }

    public static void updateGallery(Gallery gal){
        GalleryReader.addToGallery(gal);
    }

}
