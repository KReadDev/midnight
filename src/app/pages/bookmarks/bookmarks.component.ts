import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface BookmarkedManga {
  id: number;
  title: string;
  chapters: number;
  image: string;
  genres: string[];
  lastChapter: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bookmarks-container">
      <header class="page-header">
        <div class="header-content">
          <div class="header-text">
            <div class="header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill="#3b82f6" stroke="#3b82f6" stroke-width="2"/>
              </svg>
            </div>
            <div>
              <h1>Bookmarks</h1>
              <p class="page-subtitle">Your bookmarked manga collection</p>
            </div>
          </div>
          <div class="header-actions">
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
        </div>
      </header>

      <div class="search-section">
        <div class="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
          </svg>
          <input type="text" placeholder="Search bookmarked manga..." />
        </div>
      </div>

      <div class="bookmarks-grid">
        <div *ngFor="let manga of bookmarkedManga" class="bookmark-card" [routerLink]="['/manga', manga.id]">
          <div class="manga-image">
            <img [src]="manga.image" [alt]="manga.title" />
            <button class="favorite-btn active">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill="#3b82f6" stroke="#3b82f6" stroke-width="2"/>
              </svg>
            </button>
          </div>
          <div class="manga-info">
            <h3>{{ manga.title }}</h3>
            <p>{{ manga.chapters }} chapters</p>
            <p class="last-chapter">Last: {{ manga.lastChapter }}</p>
            <div class="genres">
              <span *ngFor="let genre of manga.genres" class="genre-tag">{{ genre }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bookmarks-container {
      padding: 32px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      margin-bottom: 32px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .header-text {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .header-icon {
      width: 48px;
      height: 48px;
      background: rgba(59, 130, 246, 0.1);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 4px;
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

    .header-actions {
      display: flex;
      gap: 12px;
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

    .search-section {
      margin-bottom: 32px;
    }

    .search-bar {
      position: relative;
      display: flex;
      align-items: center;
      max-width: 400px;
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

    .bookmarks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }

    .bookmark-card {
      background: #2a2a2a;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.2s ease;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }

    .bookmark-card:hover {
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
      margin: 0 0 4px 0;
    }

    .last-chapter {
      color: #3b82f6 !important;
      margin-bottom: 12px !important;
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
export class BookmarksComponent {
  bookmarkedManga: BookmarkedManga[] = [
    {
      id: 1,
      title: 'One Piece',
      chapters: 1090,
      image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
      genres: ['Action', 'Adventure'],
      lastChapter: 'Chapter 1090',
      isFavorite: true
    },
    {
      id: 2,
      title: 'My Hero Academia',
      chapters: 403,
      image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
      genres: ['Action', 'Superhero'],
      lastChapter: 'Chapter 403',
      isFavorite: true
    }
  ];
}