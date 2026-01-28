import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Card } from '../../components/card/card';
import { Manga } from '../../model/Manga';
import { MangaService } from '../../services/manga.service';
import { GalleryService } from '../../services/gallery.service';
import GalleryPlugin from '../../plugins/galleryPlugin';
import { Capacitor } from '@capacitor/core';
import { GlobalService } from '../../services/global.service';
import { FormsModule } from '@angular/forms';
// interface Manga {
//   id: number;
//   title: string;
//   chapters: number;
//   image: string;
//   genres: string[];
//   isFavorite: boolean;
//   lastRead?: string;
// }

@Component({
  selector: 'app-gallery-view',
  standalone: true,
  imports: [CommonModule, RouterLink, Card,FormsModule],
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css']
})
export class GalleryViewComponent implements OnInit {
  // category: string = '';
  mangaList: Manga[] = [];
  protected readonly viewMode = signal<'grid' | 'list'>('grid');
  showtags: boolean = false;
  tags: string[] = [];
  selectedTags: string[] = [];
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
     private mangaService: MangaService,
     private galleryService: GalleryService,
     private globalservice: GlobalService,
     private router: Router
    //  private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.category = params['category'];
      this.loadMangaForCategory();
      
    });

    this.route.queryParams.subscribe(params => {
      this.loadMangaForCategory()
    });
  }

  isGridView(): boolean {
    return this.viewMode() === 'grid';
  }

  setGridView(): void {
    this.viewMode.set('grid');
  }

  setListView(): void {
    this.viewMode.set('list');
  }

  setviewMode(): void {
    this.viewMode.set(this.viewMode() === 'grid' ? 'list' : 'grid');
  }

  filterMangaByTags(tags: string[]) {
    this.mangaList = this.mangaList.filter(manga => tags.every(tag => manga.tags.includes(tag)));
  }
  

  private async loadMangaForCategory() {

    // this.galleryService.getGalleryById(this.route.snapshot.params['id']).subscribe(gallery => {
    //   this.mangaList = gallery;
    //   const tags =this.route.snapshot.queryParams['tags'];
    //   this.getTags();
    //   if(tags){
    //     console.log(tags);
    //     this.filterMangaByTags(tags);
    //   }
    // })

    this.mangaList = (await GalleryPlugin.getGalleryById({id: this.route.snapshot.params['id']})).mangas;
    const tags =this.route.snapshot.queryParams['tags'];
    const search = this.route.snapshot.queryParams['search'];
    console.log('tags',tags);
    this.getTags();
    if(tags){
      if(typeof tags === 'string'){
        this.selectedTags = [tags];
      }else{
        this.selectedTags = tags;
      }
      this.filterMangaByTags(this.selectedTags);
    }
    if(search){
      this.searchTerm = search;
      this.filterMangaBySearch(search);
    }

    this.mangaList.forEach(manga => {
      manga.cover = Capacitor.convertFileSrc(manga.cover);
    })

    this.mangaList.sort((a, b) => parseInt(b.id) - parseInt(a.id));


  }

  searchManga(){
    this.router.navigate(['/gallery/0'], {
      queryParams: {
        search: this.searchTerm,
      }
    });
  }

  filterMangaBySearch(search: string) {
    this.mangaList = this.mangaList.filter(manga => manga.name.toLowerCase().includes(search.toLowerCase()));
  }

  getTags(){
    const tags = this.mangaList.map(manga => manga.tags).flat();
    this.tags = tags.filter((tag, index) => tags.indexOf(tag) === index).sort();
  }

  open(){
    this.showtags = true;
  }

  close(){
    this.showtags = false;
  }

  addTag(tag: string){
    // event.stopPropagation(); 
    // event.ch
    // console.log(elem.checked);
    // console.log(typeof elem)
    
    if(!this.selectedTags.includes(tag)){
      this.selectedTags.push(tag);
    }else{
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }

  }

  apply(){
    this.router.navigate(['/gallery/0'], {
      queryParams: {
        tags: this.selectedTags,
      }
    });
    this.close();
  }

  clearTags(){
    this.selectedTags = [];
    this.router.navigate(['/gallery/0']);
    this.close();
  }

  openManga(manga: Manga){
    this.globalservice.manga = manga;
    this.router.navigate(["/manga",manga.id])
  }

  reorderManga(){
    
  }
}