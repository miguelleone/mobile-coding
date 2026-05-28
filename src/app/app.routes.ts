import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'weather',
    pathMatch: 'full',
  },
  {
    path: 'weather',
    loadComponent: () => import('./weather/weather.page').then((m) => m.WeatherPage),
  },
];
