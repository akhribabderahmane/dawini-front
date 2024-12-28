import { provideRouter, Routes } from '@angular/router'; 
import { AppointmentsComponent } from './Pages/Dashboard/appointments.component';
import { HomeComponent } from './Pages/Patient-pagee/home.component';
import { PatientsDetailspage } from './Pages/patients-details-page/patients-details-page.component';
import { ConsultationDetailspage } from './Pages/consultation-details-page/consultation-details-page.component';
import { NewPatientComponent } from './components/new-patient/new-patient.component'; // Import the new-patient component
import { AddPatientpage } from './Pages/add-patient/add-patient.component';

export const routes: Routes = [
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'home', component: HomeComponent }, // Patients page route
  { path: 'patients-details/:id', component: PatientsDetailspage }, // Patients-details-page route
  { path: 'consultation-details', component: ConsultationDetailspage }, // Consultation-details-page route
  { path: 'AddPatientpage', component: AddPatientpage }, // Add-patient page route
  { path: '', redirectTo: '/appointments', pathMatch: 'full' }, // Default redirection to patients page
];

export const AppRoutingModule = provideRouter(routes);
