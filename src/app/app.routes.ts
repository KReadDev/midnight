import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/galleries', pathMatch: 'full' },
  { path: 'galleries', loadComponent: () => import('./pages/galleries/galleries.component').then(m => m.GalleriesComponent) },
  { path: 'gallery/:id', loadComponent: () => import('./pages/gallery-view/gallery-view.component').then(m => m.GalleryViewComponent) },
  { path: 'sites', loadComponent: () => import('./pages/sites/sites.component').then(m => m.SitesComponent) },
  { path: 'sites/:id', loadComponent: () => import('./pages/site-view/site-view').then(m => m.SiteView) },
  { path: 'sites/:id/:mangaid', loadComponent: () => import('./pages/site-manga/site-manga').then(m => m.SiteMangaView)},
  { path: 'downloads', loadComponent: () => import('./pages/downloads/downloads.component').then(m => m.DownloadsComponent) },
  { path: 'bookmarks', loadComponent: () => import('./pages/bookmarks/bookmarks.component').then(m => m.BookmarksComponent) },
  { path: 'manga/:id', loadComponent: () => import('./pages/manga-detail/manga-detail.component').then(m => m.MangaDetailComponent) },
  { path: 'mangaviewer/:id', loadComponent: () => import('./pages/manga-viewer/manga-viewer').then(m => m.MangaViewer) },
];
