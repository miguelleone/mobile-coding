import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { catchError, forkJoin, map, of } from 'rxjs';
import { OpenMeteoService, CurrentWeather } from '../core/services/open-meteo.service';
import { CartaoClimaDirective } from '../diretivas/wheater.file.diretiva';
import { WeatherUnitPipe } from '../pipes/weather-unit.pipe';
import { CITIES, City } from '../shared/cities';

interface CityWeather {
  city: City;
  loading: boolean;
  weather?: CurrentWeather;
  error?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    WeatherUnitPipe,
    CartaoClimaDirective,
    IonBadge,
    IonButton,
    IonCard,
    IonCardContent,
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
export class HomePage implements OnInit {
  private openMeteo = inject(OpenMeteoService);

  public cities: CityWeather[] = CITIES.map((city) => ({ city, loading: true }));
  public updatedAt = new Date();
  public loading = false;

  ngOnInit(): void {
    this.loadWeather();
  }

  loadWeather(): void {
    this.loading = true;
    this.cities = CITIES.map((city) => ({ city, loading: true }));

    forkJoin(CITIES.map((city) => this.loadCityWeather(city))).subscribe((cities) => {
      this.cities = cities;
      this.updatedAt = new Date();
      this.loading = false;
    });
  }

  private loadCityWeather(city: City) {
    return this.openMeteo.getCurrentWeather(city.latitude, city.longitude).pipe(
      map((weather): CityWeather => ({ city, weather, loading: false })),
      catchError(() => of({ city, loading: false, error: 'Clima indisponível no momento.' }))
    );
  }
}
