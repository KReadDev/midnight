import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GalleryCreator } from '../../components/gallery-creator/gallery-creator';
import { GlobalService } from '../../services/global.service';
import { GalleryService } from '../../services/gallery.service';
import { Router } from '@angular/router';
import { Gallery } from '../../model/Gallery';
import GalleryPlugin from '../../plugins/galleryPlugin';



@Component({
  selector: 'app-galleries',
  standalone: true,
  imports: [CommonModule, GalleryCreator],
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.css']
})
export class GalleriesComponent {


  // showPopup = false;
  categories: Gallery[] = [];

  constructor(
    private globalService: GlobalService,
    private galleryService: GalleryService,
    private router: Router
  ) {
    // this.showPopup = false;
  }

  async ngOnInit() {
    this.categories =(await GalleryPlugin.getAllGalleries()).galleries as Gallery[];
    
    
  }

  // recentCount = 23;

  togglePopup() {
    // this.showPopup = true;
    this.globalService.showPopup = true;
  }

  closePopup() {
    // this.showPopup = false;
    this.globalService.showPopup = false;
  }

  goToGallery(gallery: Gallery) {
    this.globalService.currentGallery = gallery;
    this.router.navigate(['/gallery', gallery.id]);
  }
  
}