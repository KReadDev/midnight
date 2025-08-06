import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

interface Manga {
  id: number;
  title: string;
  chapters: number;
  image: string;
  genres: string[];
  isFavorite: boolean;
  lastRead?: string;
}

@Component({
  selector: 'app-gallery-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css']
})
export class GalleryViewComponent implements OnInit {
  category: string = '';
  mangaList: Manga[] = [];
  protected readonly viewMode = signal<'grid' | 'list'>('grid');

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.loadMangaForCategory();
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

  getCategoryTitle(): string {
    const titles: { [key: string]: string } = {
      'all': 'All Manga',
      'favorites': 'Favorites',
      'action': 'Action Series',
      'completed': 'Completed',
      'recent': 'Last Week Read'
    };
    return titles[this.category] || 'Manga Collection';
  }

  private loadMangaForCategory() {
    // Mock data - in a real app, this would filter based on category
    this.mangaList = [
      {
        id: 1,
        title: 'One Piece',
        chapters: 1090,
        image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
        genres: ['Action', 'Adventure'],
        isFavorite: false,
        lastRead: 'Chapter 1089'
      },
      {
        id: 2,
        title: 'Attack on Titan',
        chapters: 139,
        image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
        genres: ['Action', 'Drama', 'Dark'],
        isFavorite: true,
        lastRead: 'Chapter 139'
      },
      {
        id: 3,
        title: 'My Hero Academia',
        chapters: 403,
        image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
        genres: ['Action', 'Superhero', 'Shounen'],
        isFavorite: true,
        lastRead: 'Chapter 385'
      }
    ];
  }
}