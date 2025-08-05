import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface MangaCategory {
  name: string;
  count: number;
  slug: string;
  isDefault?: boolean;
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
          [routerLink]="['/gallery', category.slug]"
        >
          <div class="category-content">
            <span class="category-name">{{ category.name }}</span>
            <span class="count">{{ category.count }} manga{{ category.count !== 1 ? 's' : '' }}</span>
          </div>
          <span class="category-label" *ngIf="category.isDefault">Default</span>
        </button>
      </div>

      <div class="recent-section">
        <button class="category-btn recent-btn" [routerLink]="['/gallery', 'recent']">
          <div class="category-content">
            <span class="category-name">last week read</span>
            <span class="count">{{ recentCount }} manga</span>
          </div>
        </button>
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
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }

    .recent-section {
      margin-top: 32px;
    }

    .category-btn {
      background: #121417;
      border: 1px solid #3a3a3a;
      border-radius: 12px;
      padding: 20px 24px;
      color: #cccccc;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-decoration: none;
      width: 100%;
      text-align: left;
    }

    .category-btn:hover {
      background: #1a1d21;
      border-color: #4a4a4a;
      transform: translateY(-1px);
    }

    .category-btn.active {
      background: #121417;
      border-color: #3c83f6;
      color: #ffffff;
    }

    .recent-btn {
      max-width: 400px;
    }

    .category-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .category-name {
      font-size: 18px;
      font-weight: 600;
      color: #ffffff;
    }

    .count {
      font-size: 14px;
      color: #888888;
    }

    .category-label {
      background: #3c83f6;
      color: #ffffff;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 6px;
      text-transform: uppercase;
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .galleries-container {
        padding: 16px;
      }

      .page-header h1 {
        font-size: 24px;
        margin-bottom: 24px;
      }

      .categories {
        grid-template-columns: 1fr;
        gap: 12px;
        margin-bottom: 24px;
      }

      .category-btn {
        padding: 16px 20px;
      }

      .category-name {
        font-size: 16px;
      }

      .count {
        font-size: 12px;
      }
    }
  `]
})
export class GalleriesComponent {
  categories: MangaCategory[] = [
    { name: 'All Manga', count: 124, slug: 'all', isDefault: true },
    { name: 'Favorites', count: 12, slug: 'favorites' },
    { name: 'Action Series', count: 45, slug: 'action' },
    { name: 'Completed', count: 23, slug: 'completed' }
  ];

  recentCount = 23;
}