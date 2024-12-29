import { provideRouter, Routes } from '@angular/router'; 
import { AddCarepage } from './pages/add-care/add-care.component';
import { HomeComponent } from './pages/Patient-pagee/home.component';
import { PatientsDetailspage } from './pages/patients-details-page/patients-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/app-home', pathMatch: 'full' }, // Default route to HomeComponent
  { path: 'app-home', component: HomeComponent }, // Route for HomeComponent
  { path: 'patients-details-page/:id', component: PatientsDetailspage }, // Route for PatientsDetailspage
  { 
    path: 'add-care', 
    component: AddCarepage // Route for AddCarepage with query parameters
  },
];

export const AppRoutingModule = provideRouter(routes);
