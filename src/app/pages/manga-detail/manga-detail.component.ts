import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Chapter {
  id: number;
  number: number;
  title: string;
  date: string;
  read: boolean;
}

interface MangaDetail {
  id: number;
  title: string;
  author: string;
  status: string;
  description: string;
  image: string;
  genres: string[];
  chapters: Chapter[];
  rating: number;
  totalChapters: number;
}

@Component({
  selector: 'app-manga-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="manga-detail-container" *ngIf="manga">
      <header class="detail-header">
        <button routerLink="/galleries" class="back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2"/>
          </svg>
          Back to Galleries
        </button>
      </header>

      <div class="manga-info-section">
        <div class="manga-cover">
          <img [src]="manga.image" [alt]="manga.title" />
        </div>
        
        <div class="manga-details">
          <h1>{{ manga.title }}</h1>
          <p class="author">by {{ manga.author }}</p>
          
          <div class="manga-meta">
            <span class="status" [class]="manga.status.toLowerCase()">{{ manga.status }}</span>
            <span class="rating">★ {{ manga.rating }}/10</span>
            <span class="chapter-count">{{ manga.totalChapters }} chapters</span>
          </div>

          <div class="genres">
            <span *ngFor="let genre of manga.genres" class="genre-tag">{{ genre }}</span>
          </div>

          <p class="description">{{ manga.description }}</p>

          <div class="action-buttons">
            <button class="primary-btn">Start Reading</button>
            <button class="secondary-btn">Add to Bookmarks</button>
            <button class="icon-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="chapters-section">
        <h2>Chapters</h2>
        <div class="chapters-list">
          <div *ngFor="let chapter of manga.chapters" class="chapter-item" [class.read]="chapter.read">
            <div class="chapter-info">
              <span class="chapter-number">{{ chapter.number }}</span>
              <span class="chapter-title">{{ chapter.title }}</span>
            </div>
            <div class="chapter-meta">
              <span class="chapter-date">{{ chapter.date }}</span>
              <div class="read-indicator" *ngIf="chapter.read"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .manga-detail-container {
      padding: 32px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .detail-header {
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
    }

    .back-btn:hover {
      background: #121417;
      color: #ffffff;
    }

    .manga-info-section {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 48px;
      margin-bottom: 48px;
    }

    .manga-cover {
      aspect-ratio: 3/4;
      border-radius: 12px;
      overflow: hidden;
    }

    .manga-cover img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .manga-details h1 {
      font-size: 36px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 8px 0;
      line-height: 1.2;
    }

    .author {
      font-size: 18px;
      color: #888888;
      margin: 0 0 24px 0;
    }

    .manga-meta {
      display: flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 24px;
    }

    .status {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status.ongoing {
      background: #10b981;
      color: #ffffff;
    }

    .status.completed {
      background: #3c83f6;
      color: #ffffff;
    }

    .rating {
      color: #f59e0b;
      font-weight: 600;
    }

    .chapter-count {
      color: #888888;
      font-size: 14px;
    }

    .genres {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    .genre-tag {
      background: #3a3a3a;
      color: #cccccc;
      font-size: 14px;
      padding: 8px 12px;
      border-radius: 6px;
    }

    .description {
      font-size: 16px;
      line-height: 1.6;
      color: #cccccc;
      margin-bottom: 32px;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .primary-btn {
      background: #3c83f6;
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      color: #ffffff;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .primary-btn:hover {
      background: #2563eb;
    }

    .secondary-btn {
      background: transparent;
      border: 1px solid #3a3a3a;
      border-radius: 8px;
      padding: 12px 24px;
      color: #cccccc;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .secondary-btn:hover {
      background: #121417;
      color: #ffffff;
    }

    .icon-btn {
      background: transparent;
      border: 1px solid #3a3a3a;
      border-radius: 8px;
      padding: 12px;
      color: #cccccc;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-btn:hover {
      background: #121417;
      color: #ffffff;
    }

    .chapters-section h2 {
      font-size: 24px;
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 24px 0;
    }

    .chapters-list {
      background: #121417;
      border-radius: 12px;
      overflow: hidden;
    }

    .chapter-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #3a3a3a;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .chapter-item:last-child {
      border-bottom: none;
    }

    .chapter-item:hover {
      background: #1a1d21;
    }

    .chapter-item.read {
      opacity: 0.6;
    }

    .chapter-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .chapter-number {
      font-weight: 600;
      color: #3c83f6;
      min-width: 60px;
    }

    .chapter-title {
      color: #ffffff;
      font-size: 16px;
    }

    .chapter-meta {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .chapter-date {
      color: #888888;
      font-size: 14px;
    }

    .read-indicator {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
    }

    @media (max-width: 768px) {
      .manga-info-section {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .manga-cover {
        max-width: 300px;
        margin: 0 auto;
      }

      .manga-detail-container {
        padding: 16px;
      }

      .manga-details h1 {
        font-size: 28px;
      }

      .author {
        font-size: 16px;
      }

      .manga-meta {
        flex-wrap: wrap;
        gap: 12px;
      }

      .description {
        font-size: 14px;
      }

      .action-buttons {
        flex-direction: column;
        gap: 12px;
      }

      .primary-btn, .secondary-btn {
        width: 100%;
        justify-content: center;
      }

      .chapters-section h2 {
        font-size: 20px;
      }

      .chapter-item {
        padding: 12px 16px;
      }

      .chapter-info {
        gap: 12px;
      }

      .chapter-number {
        min-width: 50px;
        font-size: 14px;
      }

      .chapter-title {
        font-size: 14px;
      }

      .chapter-date {
        font-size: 12px;
      }
    }
  `]
})
export class MangaDetailComponent implements OnInit {
  manga: MangaDetail | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadMangaDetail(Number(id));
  }

  private loadMangaDetail(id: number) {
    // Mock data - in a real app, this would come from a service
    this.manga = {
      id: id,
      title: 'One Piece',
      author: 'Eiichiro Oda',
      status: 'Ongoing',
      description: 'Monkey D. Luffy sails with his crew of Straw Hat Pirates through the Grand Line to find the treasure One Piece and become the next king of the pirates.',
      image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=400',
      genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Shounen'],
      rating: 9.2,
      totalChapters: 1090,
      chapters: [
        { id: 1090, number: 1090, title: 'Kizaru', date: '2023-11-20', read: false },
        { id: 1089, number: 1089, title: 'Siege', date: '2023-11-13', read: true },
        { id: 1088, number: 1088, title: 'Final Lesson', date: '2023-11-06', read: true }
      ]
    };
  }
}