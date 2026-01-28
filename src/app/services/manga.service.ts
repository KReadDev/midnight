import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Manga } from '../model/Manga';

const BASE_URL = 'http://10.0.0.112:8080/api/manga';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  constructor(private http: HttpClient) {}

  getMangaById(id: string): Observable<Manga> {
    return this.http.get<Manga>(`${BASE_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getManga(): Observable<Manga[]> {
    return this.http.get<Manga[]>(`${BASE_URL}`)
      .pipe(catchError(this.handleError));
  }

  bookmarkManga(manga: Manga): Observable<Manga> {
    return this.http.post<Manga>(`${BASE_URL}/${manga.id}/bookmark`, manga)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
