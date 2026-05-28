import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./details/details.page').then((m) => m.DetailsPage),
  },
  {
    path: 'weather',
    loadComponent: () => import('./weather/weather.page').then((m) => m.WeatherPage),
  },
];
