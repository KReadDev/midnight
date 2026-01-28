import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from '../../services/gallery.service';
import { MangaService } from '../../services/manga.service';
import { Manga } from '../../model/Manga';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import MangaPlugin from '../../plugins/mangaPlugin';
import { Capacitor } from '@capacitor/core';
// import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-manga-viewer',
  imports: [PdfViewerModule],
  templateUrl: './manga-viewer.html',
  styleUrl: './manga-viewer.css'
})
export class MangaViewer {

  manga: Manga | null = null;
  src: string = '';

  constructor(
    private route: ActivatedRoute,
    private mangaService: MangaService,
    private galleryService: GalleryService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadMangaDetail(id!);
    // this.galleryService.getGalleries().subscribe(galleries => {
    //   this.galleries = galleries;
    // });
  }

  private async loadMangaDetail(id?: string) {
    // Mock data - in a real app, this would come from a service
  //   this.mangaService.getMangaById(id!).subscribe(manga => {
  //     this.manga = manga;
  //     this.src = `http://10.0.0.112:8080/pdfs/${manga.name}.pdf`;
  //   });

    this.manga = (await MangaPlugin.getMangaById({id: id!})).manga;
    this.src = Capacitor.convertFileSrc(this.manga!.pdf);
  }

}
