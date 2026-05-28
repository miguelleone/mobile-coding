import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { OpenMeteoService, CurrentWeather } from '../core/services/open-meteo.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner, IonCard, IonCardContent],
})
export class WeatherPage implements OnInit {
  private openMeteo = inject(OpenMeteoService);
  private alertCtrl = inject(AlertController);
  public current?: CurrentWeather;
  public loading = false;
  public error?: string;
  public defaultLat = 52.52;
  public defaultLon = 13.405;

  ngOnInit() {
    this.fetch(this.defaultLat, this.defaultLon);
  }

  fetch(latitude: number | string, longitude: number | string) {
    this.loading = true;
    this.error = undefined;
    this.current = undefined;
    const lat = Number(latitude);
    const lon = Number(longitude);

    // Validação simples de latitude/longitude
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      this.loading = false;
      this.error = 'Valores inválidos — insira latitude entre -90 e 90 e longitude entre -180 e 180.';
      this.showInvalidAlert();
      return;
    }

    this.openMeteo.getCurrentWeather(lat, lon).subscribe({
      next: (cw) => {
        this.current = cw;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || String(err);
        this.loading = false;
      },
    });
  }

  private async showInvalidAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Valores inválidos',
      message: 'Latitude deve estar entre -90 e 90. Longitude deve estar entre -180 e 180. Insira valores reais.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
