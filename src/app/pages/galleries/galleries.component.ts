import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface MangaCategory {
  name: string;
  count: number;
  isDefault?: boolean;
}

interface Manga {
  id: number;
  title: string;
  chapters: number;
  image: string;
  genres: string[];
  isFavorite: boolean;
}

@Component({
  selector: 'app-galleries',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="galleries-container">
      <header class="page-header">
        <h1>Manga Galleries</h1>
      </header>

      <div class="categories">
        <button 
          *ngFor="let category of categories" 
          class="category-btn"
          [class.active]="category.isDefault"
        >
          {{ category.name }}
          <span class="count">{{ category.count }} manga{{ category.count !== 1 ? 's' : '' }}</span>
        </button>
      </div>

      <div class="recent-section">
        <h2>last week read</h2>
        <p class="section-subtitle">{{ recentManga.length }} manga</p>
      </div>

      <div class="search-section">
        <div class="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
          </svg>
          <input type="text" placeholder="Search manga or tags..." />
        </div>
        <button class="view-toggle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
        <button class="menu-toggle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/>
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/>
            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>

      <div class="manga-grid">
        <div *ngFor="let manga of mangaList" class="manga-card" [routerLink]="['/manga', manga.id]">
          <div class="manga-image">
            <img [src]="manga.image" [alt]="manga.title" />
            <button class="favorite-btn" [class.active]="manga.isFavorite">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" [attr.fill]="manga.isFavorite ? '#3b82f6' : 'none'" stroke="#3b82f6" stroke-width="2"/>
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
    </div>
  `,
  styles: [`
    .galleries-container {
      padding: 32px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header h1 {
      font-size: 32px;
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 32px 0;
    }

    .categories {
      display: flex;
      gap: 16px;
      margin-bottom: 48px;
      flex-wrap: wrap;
    }

    .category-btn {
      background: #2a2a2a;
      border: 1px solid #3a3a3a;
      border-radius: 8px;
      padding: 12px 20px;
      color: #cccccc;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 120px;
    }

    .category-btn:hover {
      background: #3a3a3a;
      border-color: #4a4a4a;
    }

    .category-btn.active {
      background: #3b82f6;
      border-color: #3b82f6;
      color: #ffffff;
    }

    .count {
      font-size: 12px;
      opacity: 0.8;
      margin-top: 4px;
    }

    .recent-section {
      margin-bottom: 24px;
    }

    .recent-section h2 {
      font-size: 18px;
      font-weight: 500;
      color: #ffffff;
      margin: 0 0 4px 0;
    }

    .section-subtitle {
      font-size: 14px;
      color: #888888;
      margin: 0 0 24px 0;
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
      background: #2a2a2a;
      border: 1px solid #3a3a3a;
      border-radius: 8px;
      padding: 12px 16px 12px 48px;
      color: #ffffff;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s ease;
    }

    .search-bar input:focus {
      border-color: #3b82f6;
    }

    .search-bar input::placeholder {
      color: #888888;
    }

    .view-toggle, .menu-toggle {
      background: #3b82f6;
      border: none;
      border-radius: 6px;
      padding: 10px;
      color: #ffffff;
      cursor: pointer;
      transition: background 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .view-toggle:hover, .menu-toggle:hover {
      background: #2563eb;
    }

    .manga-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }

    .manga-card {
      background: #2a2a2a;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.2s ease;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }

    .manga-card:hover {
      background: #3a3a3a;
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
  `]
})
export class GalleriesComponent {
  categories: MangaCategory[] = [
    { name: 'All Manga', count: 124, isDefault: true },
    { name: 'Favorites', count: 12 },
    { name: 'Action Series', count: 45 },
    { name: 'Completed', count: 23 }
  ];

  recentManga: Manga[] = [];

  mangaList: Manga[] = [
    {
      id: 1,
      title: 'One Piece',
      chapters: 1090,
      image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
      genres: ['Action', 'Adventure'],
      isFavorite: false
    },
    {
      id: 2,
      title: 'Attack on Titan',
      chapters: 139,
      image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
      genres: ['Action', 'Drama'],
      isFavorite: true
    },
    {
      id: 3,
      title: 'My Hero Academia',
      chapters: 403,
      image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
      genres: ['Action', 'Superhero'],
      isFavorite: true
    }
  ];
}