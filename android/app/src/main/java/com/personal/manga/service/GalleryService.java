package com.personal.manga.service;

import com.personal.manga.domain.Gallery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GalleryService {

    public List<Gallery> getGalleries(){
        return GalleryReader.getGalleries();
    }

    public List<Gallery> createGallery(Gallery gallery){
        GalleryReader.createGallery(gallery);
        return GalleryReader.getGalleries();
    }

    public List<Gallery> addToGallery(Gallery gallery){
        GalleryReader.addToGallery(gallery);
        return GalleryReader.getGalleries();
    }

    public void updateGallery(Gallery gal){
        GalleryReader.addToGallery(gal);
    }

}
