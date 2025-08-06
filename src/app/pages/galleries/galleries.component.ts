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
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
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