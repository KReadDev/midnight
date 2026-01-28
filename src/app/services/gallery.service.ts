import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Gallery } from '../model/Gallery';
import { Manga } from '../model/Manga';

const BASE_URL = 'http://10.0.0.112:8080/api/gallery';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
    constructor(private http: HttpClient) {}

    createGallery(gallery: Gallery): Observable<Gallery> {
        return this.http.post<Gallery>(`${BASE_URL}`, gallery)
          .pipe(catchError(this.handleError));
    }

    getGalleries(): Observable<Gallery[]> {
        return this.http.get<Gallery[]>(`${BASE_URL}`)
          .pipe(catchError(this.handleError));
    }

    getGalleryById(id: string): Observable<Manga[]> {
        
        return this.http.get<Manga[]>(`${BASE_URL}/${id}`)
          .pipe(catchError(this.handleError));
    }

    // updateGallery(gallery: Gallery): Observable<Gallery> {
    //     return this.http.put<Gallery>(`${BASE_URL}/${gallery.id}`, gallery)
    //       .pipe(catchError(this.handleError));
    // }

    addMangaToGallery(galleryId: string, mangaId: string): Observable<void> {
        
        return this.http.post<void>(`${BASE_URL}/${galleryId}`,mangaId)
          .pipe(catchError(this.handleError));
    }

    deleteGallery(id: string): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/${id}`)
          .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
      return throwError(() => new Error(error.message || 'Server Error'));
    }
}