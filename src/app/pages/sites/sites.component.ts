import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MangaSite {
  id: number;
  name: string;
  icon: string;
  url: string;
  description: string;
}

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sites-container">
      <header class="page-header">
        <h1>Manga Sites</h1>
        <p class="page-subtitle">Browse and download manga from supported sites</p>
      </header>

      <div class="sites-grid">
        <div *ngFor="let site of sites" class="site-card">
          <div class="site-icon">
            <img [src]="site.icon" [alt]="site.name" />
          </div>
          <div class="site-info">
            <h3>{{ site.name }}</h3>
            <p>{{ site.description }}</p>
            <a [href]="site.url" target="_blank" class="site-link">
              Visit Site
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sites-container {
      padding: 32px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      margin-bottom: 48px;
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

    .sites-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }

    .site-card {
      background: #2a2a2a;
      border: 1px solid #3a3a3a;
      border-radius: 12px;
      padding: 24px;
      transition: all 0.2s ease;
    }

    .site-card:hover {
      background: #3a3a3a;
      border-color: #4a4a4a;
      transform: translateY(-2px);
    }

    .site-icon {
      width: 48px;
      height: 48px;
      background: #3b82f6;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }

    .site-icon img {
      width: 24px;
      height: 24px;
      filter: brightness(0) invert(1);
    }

    .site-info h3 {
      font-size: 18px;
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 8px 0;
    }

    .site-info p {
      font-size: 14px;
      color: #888888;
      margin: 0 0 16px 0;
      line-height: 1.5;
    }

    .site-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #3b82f6;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .site-link:hover {
      color: #60a5fa;
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .sites-container {
        padding: 16px;
      }

      .page-header h1 {
        font-size: 24px;
      }

      .sites-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .site-card {
        padding: 20px;
      }
    }
  `]
})
export class SitesComponent {
  sites: MangaSite[] = [
    {
      id: 1,
      name: 'MangaPlus',
      icon: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=48',
      url: 'https://mangaplus.shueisha.co.jp',
      description: 'Official manga reading platform by Shueisha with free chapters from popular series.'
    }
  ];
}