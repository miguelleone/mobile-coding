import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { forkJoin } from 'rxjs';
import { CurrentWeather, OpenMeteoResponse, OpenMeteoService } from '../core/services/open-meteo.service';
import { CartaoClimaDirective } from '../diretivas/wheater.file.diretiva';
import { WeatherUnitPipe } from '../pipes/weather-unit.pipe';
import { CITIES, City } from '../shared/cities';

interface ForecastItem {
  time: string;
  temperature: number;
  humidity: number;
  windspeed: number;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    WeatherUnitPipe,
    CartaoClimaDirective,
    IonBackButton,
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonSpinner,
    IonTitle,
    IonToolbar,
  ],
})
export class DetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private openMeteo = inject(OpenMeteoService);

  public city?: City;
  public current?: CurrentWeather;
  public forecast: ForecastItem[] = [];
  public loading = true;
  public error?: string;

  ngOnInit(): void {
    const cityId = this.route.snapshot.paramMap.get('id');
    const city = CITIES.find((item) => item.id === cityId);

    if (!city) {
      this.loading = false;
      this.error = 'Cidade não encontrada.';
      return;
    }

    this.city = city;
    this.loadDetails(city);
  }

  loadDetails(city: City): void {
    this.loading = true;
    this.error = undefined;

    forkJoin({
      current: this.openMeteo.getCurrentWeather(city.latitude, city.longitude),
      hourly: this.openMeteo.getHourlyForecast(city.latitude, city.longitude, [
        'temperature_2m',
        'relativehumidity_2m',
        'windspeed_10m',
      ]),
    }).subscribe({
      next: ({ current, hourly }) => {
        this.current = current;
        this.forecast = this.mapForecast(hourly);
        this.loading = false;
      },
      error: () => {
        this.error = 'Não foi possível carregar a previsão detalhada.';
        this.loading = false;
      },
    });
  }

  private mapForecast(response: OpenMeteoResponse): ForecastItem[] {
    const hourly = response.hourly;

    if (!hourly) {
      return [];
    }

    const times = hourly.time;
    const temperatures = hourly['temperature_2m'] ?? [];
    const humidities = hourly['relativehumidity_2m'] ?? [];
    const windspeeds = hourly['windspeed_10m'] ?? [];

    return times.slice(0, 12).map((time, index) => ({
      time,
      temperature: this.toNumber(temperatures[index]),
      humidity: this.toNumber(humidities[index]),
      windspeed: this.toNumber(windspeeds[index]),
    }));
  }

  private toNumber(value: unknown): number {
    const parsedValue = Number(value);
    return Number.isNaN(parsedValue) ? 0 : parsedValue;
  }
}
