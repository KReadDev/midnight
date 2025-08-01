import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/galleries', pathMatch: 'full' },
  { path: 'galleries', loadComponent: () => import('./pages/galleries/galleries.component').then(m => m.GalleriesComponent) },
  { path: 'sites', loadComponent: () => import('./pages/sites/sites.component').then(m => m.SitesComponent) },
  { path: 'downloads', loadComponent: () => import('./pages/downloads/downloads.component').then(m => m.DownloadsComponent) },
  { path: 'bookmarks', loadComponent: () => import('./pages/bookmarks/bookmarks.component').then(m => m.BookmarksComponent) },
  { path: 'manga/:id', loadComponent: () => import('./pages/manga-detail/manga-detail.component').then(m => m.MangaDetailComponent) }
];
