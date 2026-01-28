import { Component, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../services/global.service';
import { Gallery } from '../../model/Gallery';
import { GalleryService } from '../../services/gallery.service';
import { FormsModule } from '@angular/forms';
import GalleryPlugin from '../../plugins/galleryPlugin';

@Component({
  selector: 'app-gallery-creator',
  imports: [CommonModule,FormsModule  ],
  templateUrl: './gallery-creator.html',
  styleUrl: './gallery-creator.css'
})
export class GalleryCreator {
  show: boolean = false;

  showPopup = new EventEmitter<boolean>();

  galleryName: string = '';

  constructor(public globalService: GlobalService, public galleryService: GalleryService) {
   
  }

  ngOnInit() {
    this.showPopup.subscribe((show) => {
      this.show = show;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.show = this.globalService.showPopup;
  }

  close() {
    
    this.globalService.showPopup = false;
  }

  handleCreateGallery() {
    const gallery: Gallery = {
      id: "",
      name: this.galleryName,
      mangaIds: [],
      isDefault: false,
      count: 0
    };

    // this.galleryService.createGallery(gallery).subscribe((gallery) => {
    //   console.log("created gallry");
      
    // });
    GalleryPlugin.createGallery({gallery: {object: gallery}});
    this.close();
    window.location.reload();

    
  }
}
