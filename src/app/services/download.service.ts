import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DownloadData } from '../model/Download';

const BASE_URL = 'http://10.0.0.112:8080/api/download';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private readonly baseUrl = 'http://10.0.0.112:8080/api/download';

  constructor(private http: HttpClient) {}

  getDownloads(): Observable<DownloadData[]> {
    return this.http.get<DownloadData[]>(`${this.baseUrl}`);
  }

  downloadManga(mangaId: string, siteId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/start`, { mangaId, siteId });
  }

  resumeDownload(downloadId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/resume/${downloadId}`, {});
  }

  pauseDownload(downloadId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/pause/${downloadId}`, {});
  }

  retryDownload(downloadId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/retry/${downloadId}`, {});
  }

  cancelDownload(downloadId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/cancel/${downloadId}`, {});
  }

  downloadMangaOld(): Observable<DownloadData[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<DownloadData[]>(BASE_URL, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
