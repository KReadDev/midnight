import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SiteManga } from '../model/SiteManga';

const BASE_URL = 'http://10.0.0.112:8080/api/sitemanga';

@Injectable({
  providedIn: 'root'
})
export class SiteMangaService {
  constructor(private http: HttpClient) {}

  getSiteMangaById(id: string): Observable<SiteManga> {
    return this.http.get<SiteManga>(`${BASE_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  downloadManga(siteManga: SiteManga): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${BASE_URL}`, JSON.stringify(siteManga), { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
