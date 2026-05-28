import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

export interface HourlyData {
  time: string[];
  [key: string]: any[];
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms?: number;
  utc_offset_seconds?: number;
  timezone?: string;
  timezone_abbreviation?: string;
  elevation?: number;
  current_weather?: CurrentWeather;
  hourly?: HourlyData;
  hourly_units?: { [key: string]: string };
}

@Injectable({
  providedIn: 'root',
})
export class OpenMeteoService {
  private baseUrl = environment.openMeteoBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtém o `current_weather` para latitude/longitude.
   * Exemplo de chamada: getCurrentWeather(52.52, 13.405)
   */
  getCurrentWeather(latitude: number, longitude: number): Observable<CurrentWeather> {
    const url = `${this.baseUrl}/forecast`;
    const params = new HttpParams()
      .set('latitude', String(latitude))
      .set('longitude', String(longitude))
      .set('current_weather', 'true')
      .set('timezone', 'auto');

    return this.http.get<OpenMeteoResponse>(url, { params }).pipe(
      map((res) => {
        if (!res || !res.current_weather) throw new Error('Resposta inválida da Open-Meteo');
        return res.current_weather;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Obtém previsões horárias. `hourlyParams` aceita campos como
   * 'temperature_2m', 'relativehumidity_2m', 'windspeed_10m', etc.
   * Se `startDate`/`endDate` forem fornecidos, use o formato YYYY-MM-DD.
   */
  getHourlyForecast(
    latitude: number,
    longitude: number,
    hourlyParams: string[] = ['temperature_2m'],
    startDate?: string,
    endDate?: string,
    timezone: string = 'auto'
  ): Observable<OpenMeteoResponse> {
    const url = `${this.baseUrl}/forecast`;
    let params = new HttpParams()
      .set('latitude', String(latitude))
      .set('longitude', String(longitude))
      .set('hourly', hourlyParams.join(','))
      .set('timezone', timezone);

    if (startDate) params = params.set('start_date', startDate);
    if (endDate) params = params.set('end_date', endDate);

    return this.http.get<OpenMeteoResponse>(url, { params }).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    const message = error?.message || error?.statusText || 'Erro desconhecido ao acessar Open-Meteo';
    return throwError(() => new Error(message));
  }
}
