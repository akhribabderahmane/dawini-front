
import { provideRouter, Routes } from '@angular/router';
import { AppointmentsComponent } from './Pages/appointments/appointments.component';
//import { ProfilePageComponent } from './pages/profile/profile-page.component';
import { HomeComponent } from './Pages/home/home.component';
import { AppointmentsDetailsComponent } from './Pages/appointments-details/appointments-details.component';
import { PatientProfileComponent } from './Pages/patient-profile/patient-profile.component';
export const routes: Routes = [
  { path: 'appointments', component: AppointmentsComponent },
  //{ path: 'profile', component: ProfilePageComponent },
  { path: 'login', component:HomeComponent},
  { path: '', redirectTo: '/appointments', pathMatch: 'full' }, // Default redirection
  { path: 'appointment-details/:id', component: AppointmentsDetailsComponent },
  { path: 'profile/:id', component: PatientProfileComponent },
];

export const AppRoutingModule = provideRouter(routes);

