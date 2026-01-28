import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Site } from '../model/Site';
import { SitePage } from '../model/SitePage';

const BASE_URL = 'http://10.0.0.112:8080/api/sites';

@Injectable({ 
  providedIn: 'root'
})
export class SiteService {
  constructor(private http: HttpClient) {}

  getAllSites(): Observable<Site[]> {
    return this.http.get<Site[]>(BASE_URL)
      .pipe(catchError(this.handleError));
  }

  getSiteById(id: string): Observable<SitePage> {
    return this.http.get<SitePage>(`${BASE_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getSiteByPage(id: string, page: string): Observable<SitePage> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SitePage>(`${BASE_URL}/${id}/page`, page, { headers })
      .pipe(catchError(this.handleError));
  }

  findTerm(id: string, term: string): Observable<SitePage> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SitePage>(`${BASE_URL}/${id}/search`, term, { headers })
      .pipe(catchError(this.handleError));
  }

  filterTerm(id: string, term: string): Observable<SitePage> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SitePage>(`${BASE_URL}/${id}/filter`, term, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
