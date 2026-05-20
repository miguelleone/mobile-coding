import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class WikipediaService {
  private readonly baseUrl = 'https://pt.wikipedia.org';

  constructor(private http: HttpService) {}

  search(query: string): Observable<any> {
    const params = new HttpParams()
      .set('action', 'query')
      .set('list', 'search')
      .set('srsearch', query)
      .set('format', 'json')
      .set('origin', '*');

    return this.http.get<any>(`${this.baseUrl}/w/api.php`, { params });
  }

  getPageSummary(title: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    );
  }
}
