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
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
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