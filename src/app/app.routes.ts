import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'search-city',
    loadComponent: () => import('./Pages/search-city/search-city.page').then((m) => m.SearchCityPage),
  },
  {
    path: '',
    redirectTo: 'search-city',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo:'search-city',
  },
  {
    path: 'forecast',
    loadComponent: () => import('./Pages/forecast/forecast.page').then( m => m.ForecastPage)
  },
  {
    path: 'manage-cities',
    loadComponent: () => import('./pages/manage-cities/manage-cities.page').then( m => m.ManageCitiesPage)
  },
];
