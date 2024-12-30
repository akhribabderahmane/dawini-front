import { Page2Component } from './Pages/page2/page2.component';
import { PatientListComponent } from './Pages/patient-list/patient-list.component';
import { provideRouter, Routes } from '@angular/router';
import { AppointmentsComponent } from './Pages/appointments/appointments.component';
//import { ProfilePageComponent } from './pages/profile/profile-page.component';
import { HomeComponent } from './Pages/home/home.component';
import { AppointmentsDetailsComponent } from './Pages/appointments-details/appointments-details.component';
import { PatientProfileComponent } from './Pages/patient-profile/patient-profile.component';
import { ModifyPatientComponent} from './Pages/modify-patient/modify-patient.component';
import { importexcelComponent} from './Pages/importexcel/importexcel.component';
import { ImportDataComponent } from './Pages/import-data/import-data.component';
import { Page2RadiologueComponent } from './Pages/page2-radiologue/page2-radiologue.component';

export const routes: Routes = [
  { path: 'appointments', component: AppointmentsComponent },
  //{ path: 'profile', component: ProfilePageComponent },
  { path: 'login', component:HomeComponent},
  { path: '', redirectTo: '/appointments', pathMatch: 'full' }, // Default redirection
  { path: 'appointment-details/:id/:userRole', component: AppointmentsDetailsComponent },
  { path: 'profile', component: PatientProfileComponent },
  { path: 'profile/:id', component: PatientProfileComponent },
  { path: 'patientinfo/:id', component: ModifyPatientComponent },
  {path: 'patientslist', component: PatientListComponent},
  { path: 'import-excel', component: importexcelComponent },
  { path: 'data-view', component: Page2Component },
  { path: 'import-image', component: ImportDataComponent },
    { path: 'view-images', component: Page2RadiologueComponent },
];

export const AppRoutingModule = provideRouter(routes);
