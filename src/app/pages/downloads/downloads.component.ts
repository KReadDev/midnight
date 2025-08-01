import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Download {
  id: number;
  title: string;
  source: string;
  progress: number;
  status: 'active' | 'completed' | 'failed' | 'paused';
  speed?: string;
}

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="downloads-container">
      <header class="page-header">
        <h1>Downloads</h1>
        <p class="page-subtitle">Manage your manga downloads</p>
      </header>

      <div class="download-tabs">
        <button class="tab-btn active">Active ({{ activeDownloads.length }})</button>
        <button class="tab-btn">Completed ({{ completedDownloads.length }})</button>
        <button class="tab-btn">Failed ({{ failedDownloads.length }})</button>
      </div>

      <div class="downloads-list">
        <div *ngFor="let download of activeDownloads" class="download-item">
          <div class="download-info">
            <div class="download-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill="#f59e0b" stroke="#f59e0b" stroke-width="2"/>
              </svg>
            </div>
            <div class="download-details">
              <h3>{{ download.title }}</h3>
              <p>{{ download.source }}</p>
            </div>
          </div>
          
          <div class="download-progress">
            <div class="progress-info">
              <span class="progress-text">Progress</span>
              <span class="progress-percentage">{{ download.progress }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="download.progress"></div>
            </div>
            <div class="download-status">
              <span class="status-badge" [class]="download.status">{{ download.status }}</span>
              <span *ngIf="download.speed" class="download-speed">{{ download.speed }}</span>
            </div>
          </div>

          <div class="download-actions">
            <button class="action-btn pause" *ngIf="download.status === 'active'">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
              </svg>
            </button>
            <button class="action-btn delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .downloads-container {
      padding: 32px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      margin-bottom: 32px;
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

    .download-tabs {
      display: flex;
      gap: 2px;
      margin-bottom: 32px;
      background: #2a2a2a;
      border-radius: 8px;
      padding: 4px;
      width: fit-content;
    }

    .tab-btn {
      background: transparent;
      border: none;
      padding: 12px 20px;
      color: #888888;
      font-size: 14px;
      font-weight: 500;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .tab-btn:hover {
      color: #ffffff;
      background: #3a3a3a;
    }

    .tab-btn.active {
      background: #3b82f6;
      color: #ffffff;
    }

    .downloads-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .download-item {
      background: #2a2a2a;
      border: 1px solid #3a3a3a;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .download-info {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 200px;
    }

    .download-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .download-details h3 {
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 4px 0;
    }

    .download-details p {
      font-size: 14px;
      color: #888888;
      margin: 0;
    }

    .download-progress {
      flex: 1;
      min-width: 300px;
    }

    .progress-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .progress-text {
      font-size: 14px;
      color: #888888;
    }

    .progress-percentage {
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
    }

    .progress-bar {
      width: 100%;
      height: 6px;
      background: #3a3a3a;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .progress-fill {
      height: 100%;
      background: #3b82f6;
      border-radius: 3px;
      transition: width 0.3s ease;
    }

    .download-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .status-badge {
      font-size: 12px;
      font-weight: 500;
      padding: 4px 8px;
      border-radius: 4px;
      text-transform: capitalize;
    }

    .status-badge.active {
      background: #3b82f6;
      color: #ffffff;
    }

    .status-badge.paused {
      background: #f59e0b;
      color: #ffffff;
    }

    .download-speed {
      font-size: 12px;
      color: #888888;
    }

    .download-actions {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      background: transparent;
      border: 1px solid #3a3a3a;
      border-radius: 6px;
      padding: 8px;
      color: #888888;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .action-btn:hover {
      background: #3a3a3a;
      color: #ffffff;
    }

    .action-btn.delete:hover {
      background: #dc2626;
      border-color: #dc2626;
      color: #ffffff;
    }
  `]
})
export class DownloadsComponent {
  activeDownloads: Download[] = [
    {
      id: 1,
      title: 'One Piece',
      source: 'MangaPlus',
      progress: 45,
      status: 'active',
      speed: 'Downloading'
    },
    {
      id: 2,
      title: 'Naruto',
      source: 'MangaDex',
      progress: 100,
      status: 'active',
      speed: 'Paused'
    }
  ];

  completedDownloads: Download[] = [];
  failedDownloads: Download[] = [];
}