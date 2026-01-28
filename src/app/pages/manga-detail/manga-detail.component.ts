import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MangaService } from '../../services/manga.service';
import { Manga } from '../../model/Manga';
import { GalleryService } from '../../services/gallery.service';
import { Gallery } from '../../model/Gallery';
import GalleryPlugin from '../../plugins/galleryPlugin';
import MangaPlugin from '../../plugins/mangaPlugin';
import { Capacitor } from '@capacitor/core';




@Component({
  selector: 'app-manga-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.css']
})
export class MangaDetailComponent implements OnInit {
  manga: Manga | null = null;
  showGalleryModal = false;
  galleries: Gallery[] = [];

  cover : string = '';

  constructor(
    private route: ActivatedRoute,
    private mangaService: MangaService,
    private galleryService: GalleryService,
    private router: Router
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadMangaDetail(id!);
    // this.galleryService.getGalleries().subscribe(galleries => {
    //   this.galleries = galleries;
    // });
    this.galleries =(await GalleryPlugin.getAllGalleries()).galleries as Gallery[];
    
  }

  private async loadMangaDetail(id?: string) {
    // Mock data - in a real app, this would come from a service
    // this.mangaService.getMangaById(id!).subscribe(manga => {
    //   this.manga = manga;
    // });
    this.manga = (await MangaPlugin.getMangaById({id: id!})).manga;
    this.cover = Capacitor.convertFileSrc(this.manga.cover);
    console.log("cover ",this.cover);
  }

  setShowGalleryModal(value: boolean) {
    this.showGalleryModal = value;
  }

  addToGallery(galleryId: string) {
    // this.galleryService.addMangaToGallery(galleryId, this.manga!.id!).subscribe();
    this.showGalleryModal = false;
    GalleryPlugin.addToGallery({id: galleryId, mangaid:this.manga?.id!})
  }

  searchTag(tag: string) {
    this.router.navigate(['/gallery/0'], {
      queryParams: {
        tags: tag,
      }
    });
  }

  bookmarkManga(){
    // this.mangaService.addMangaToBookmarks(this.manga!.id!).subscribe();
    this.manga!.bookmarked = !this.manga!.bookmarked;
    MangaPlugin.bookmark({manga: {object: this.manga!}});
  }

  readManga(){
    // this.router.navigate(["http://10.0.0.112:8080/pdfs/"+this.manga!.name+".pdf"]);
    // window.open("http://10.0.0.112:8080/pdfs/"+this.manga!.name+".pdf")
    this.router.navigate(["/mangaviewer/"+this.manga!.id]);
    
  }

  deleteManga(){
    MangaPlugin.deleteManga({manga: {object: this.manga!}});
  }

  reorderManga(){
   MangaPlugin.reorderManga(); 
  }
}