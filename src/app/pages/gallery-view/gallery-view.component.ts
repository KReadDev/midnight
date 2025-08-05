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
  template: `
    <div class="gallery-container">
      <header class="page-header">
        <button routerLink="/galleries" class="back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2"/>
          </svg>
          Back to Galleries
        </button>
        <h1>{{ getCategoryTitle() }}</h1>
        <p class="page-subtitle">{{ mangaList.length }} manga</p>
      </header>

      <div class="search-section">
        <div class="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
          </svg>
          <input type="text" placeholder="Search manga or tags..." />
        </div>
        <div class="view-controls">
          <button 
            class="view-toggle" 
            [class.active]="isGridView()"
            (click)="setGridView()"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
          <button 
            class="view-toggle" 
            [class.active]="!isGridView()"
            (click)="setListView()"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/>
              <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/>
              <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Grid View -->
      <div *ngIf="isGridView()" class="manga-grid">
        <div *ngFor="let manga of mangaList" class="manga-card" [routerLink]="['/manga', manga.id]">
          <div class="manga-image">
            <img [src]="manga.image" [alt]="manga.title" />
            <button class="favorite-btn" [class.active]="manga.isFavorite">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" [attr.fill]="manga.isFavorite ? '#3c83f6' : 'none'" stroke="#3c83f6" stroke-width="2"/>
              </svg>
            </button>
          </div>
          <div class="manga-info">
            <h3>{{ manga.title }}</h3>
            <p>{{ manga.chapters }} chapters</p>
            <div class="genres">
              <span *ngFor="let genre of manga.genres" class="genre-tag">{{ genre }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div *ngIf="!isGridView()" class="manga-list">
        <div *ngFor="let manga of mangaList" class="manga-list-item" [routerLink]="['/manga', manga.id]">
          <div class="manga-thumbnail">
            <img [src]="manga.image" [alt]="manga.title" />
          </div>
          <div class="manga-details">
            <h3>{{ manga.title }}</h3>
            <p class="chapter-count">{{ manga.chapters }} chapters</p>
            <p *ngIf="manga.lastRead" class="last-read">Last read: {{ manga.lastRead }}</p>
            <div class="genres">
              <span *ngFor="let genre of manga.genres" class="genre-tag">{{ genre }}</span>
            </div>
          </div>
          <button class="favorite-btn" [class.active]="manga.isFavorite">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" [attr.fill]="manga.isFavorite ? '#3c83f6' : 'none'" stroke="#3c83f6" stroke-width="2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .gallery-container {
      padding: 32px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      margin-bottom: 32px;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      border: 1px solid #3a3a3a;
      border-radius: 8px;
      padding: 10px 16px;
      color: #cccccc;
      text-decoration: none;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-bottom: 16px;
    }

    .back-btn:hover {
      background: #121417;
      color: #ffffff;
    }

    .page-header h1 {
      font-size: 32px;
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 8px 0;
    }

    .page-subtitle {
      font-size: 16px;
      color: #888888;
      margin: 0;
    }

    .search-section {
      display: flex;
      gap: 12px;
      margin-bottom: 32px;
      align-items: center;
    }

    .search-bar {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-bar svg {
      position: absolute;
      left: 16px;
      color: #888888;
      z-index: 1;
    }

    .search-bar input {
      width: 100%;
      background: #121417;
      border: 1px solid #3a3a3a;
      border-radius: 8px;
      padding: 12px 16px 12px 48px;
      color: #ffffff;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s ease;
    }

    .search-bar input:focus {
      border-color: #3c83f6;
    }

    .search-bar input::placeholder {
      color: #888888;
    }

    .view-controls {
      display: flex;
      gap: 4px;
      background: #121417;
      border-radius: 8px;
      padding: 4px;
    }

    .view-toggle {
      background: transparent;
      border: none;
      border-radius: 6px;
      padding: 10px;
      color: #888888;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .view-toggle:hover {
      color: #ffffff;
      background: #1a1d21;
    }

    .view-toggle.active {
      background: #3c83f6;
      color: #ffffff;
    }

    /* Grid View Styles */
    .manga-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }

    .manga-card {
      background: #121417;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.2s ease;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }

    .manga-card:hover {
      background: #1a1d21;
      transform: translateY(-2px);
    }

    .manga-image {
      position: relative;
      aspect-ratio: 3/4;
      overflow: hidden;
    }

    .manga-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .favorite-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(0, 0, 0, 0.7);
      border: none;
      border-radius: 6px;
      padding: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .favorite-btn:hover {
      background: rgba(0, 0, 0, 0.9);
    }

    .manga-info {
      padding: 16px;
    }

    .manga-info h3 {
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 8px 0;
      line-height: 1.3;
    }

    .manga-info p {
      font-size: 14px;
      color: #888888;
      margin: 0 0 12px 0;
    }

    .genres {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .genre-tag {
      background: #3a3a3a;
      color: #cccccc;
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
    }

    /* List View Styles */
    .manga-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .manga-list-item {
      background: #121417;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: all 0.2s ease;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }

    .manga-list-item:hover {
      background: #1a1d21;
    }

    .manga-thumbnail {
      width: 80px;
      height: 120px;
      border-radius: 8px;
      overflow: hidden;
      flex-shrink: 0;
    }

    .manga-thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .manga-details {
      flex: 1;
    }

    .manga-details h3 {
      font-size: 18px;
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 8px 0;
    }

    .chapter-count {
      font-size: 14px;
      color: #888888;
      margin: 0 0 4px 0;
    }

    .last-read {
      font-size: 14px;
      color: #3c83f6;
      margin: 0 0 12px 0;
    }

    .manga-list-item .favorite-btn {
      position: static;
      background: transparent;
      border: 1px solid #3a3a3a;
      border-radius: 6px;
      padding: 8px;
      color: #888888;
      flex-shrink: 0;
    }

    .manga-list-item .favorite-btn:hover {
      background: #1a1d21;
      color: #ffffff;
    }

    .manga-list-item .favorite-btn.active {
      border-color: #3c83f6;
      color: #3c83f6;
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .gallery-container {
        padding: 16px;
      }

      .page-header h1 {
        font-size: 24px;
      }

      .search-section {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }

      .view-controls {
        align-self: center;
      }

      .manga-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }

      .manga-card {
        border-radius: 8px;
      }

      .manga-info {
        padding: 12px;
      }

      .manga-info h3 {
        font-size: 14px;
      }

      .manga-info p {
        font-size: 12px;
      }

      .genre-tag {
        font-size: 10px;
        padding: 2px 6px;
      }

      .manga-list-item {
        padding: 16px;
        gap: 16px;
      }

      .manga-thumbnail {
        width: 60px;
        height: 90px;
      }

      .manga-details h3 {
        font-size: 16px;
      }

      .chapter-count, .last-read {
        font-size: 12px;
      }
    }

    @media (max-width: 480px) {
      .manga-grid {
        grid-template-columns: 1fr;
      }

      .manga-list-item {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
      }

      .manga-thumbnail {
        width: 100%;
        height: 200px;
      }
    }
  `]
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