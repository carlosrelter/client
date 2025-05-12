import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientsComponent } from './pages/clients/clients.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'client', component: ClientsComponent }

];
