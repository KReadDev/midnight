import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Card } from '../../components/card/card';
import { Manga } from '../../model/Manga';
import MangaPlugin from '../../plugins/mangaPlugin';
import { Capacitor } from '@capacitor/core';



@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, RouterLink,Card],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit{
  bookmarkedManga: Manga[] = [];
  showtags: boolean = false;
  protected readonly viewMode = signal<'grid' | 'list'>('grid');
  selectedTags: string[] = [];
  tags: string[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadBookmarks();
  }

  private async loadBookmarks() {
    this.bookmarkedManga = (await MangaPlugin.getAllManga()).manga;
    this.getTags();
    this.bookmarkedManga = this.bookmarkedManga.filter(manga => manga.bookmarked);
    this.bookmarkedManga.forEach(manga => {
      manga.cover = Capacitor.convertFileSrc(manga.cover);
    });
  }

  open(){
    this.showtags = true;
  }

  close(){
    this.showtags = false;
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

  getTags(){
    const tags = this.bookmarkedManga.map(manga => manga.tags).flat();
    this.tags = tags.filter((tag, index) => tags.indexOf(tag) === index).sort();
  }

  apply(){
    this.router.navigate(['/gallery/0'], {
      queryParams: {
        tags: this.selectedTags,
      }
    });
    this.close();
  }
}