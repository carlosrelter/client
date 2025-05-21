import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: '**',component: HomeComponent },
  {
    path: 'clients',
    loadComponent: () =>
      import('./pages/clients/clients.component').then(m => m.ClientsComponent)
  }

];
