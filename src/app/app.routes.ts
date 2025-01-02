import { provideRouter, Routes } from '@angular/router';
import { AppointmentsComponent } from './Pages/appointments/appointments.component';
//import { ProfilePageComponent } from './pages/profile/profile-page.component';
import { HomeComponent } from './Pages/home/home.component';
import { AppointmentsDetailsComponent } from './Pages/appointments-details/appointments-details.component';
import { PatientProfileComponent } from './Pages/patient-profile/patient-profile.component';
import { ModifyPatientComponent } from './Pages/modify-patient/modify-patient.component';
import { AddPatientComponent } from './Pages/add-patient/add-patient.component';
import {DoctorProfileComponent} from './Pages/doctor-profile/doctor-profile.component';
import { ListeDesPatientsComponent} from './Pages/liste-des-patients/liste-des-patients.component'
import { PatientAppointmentsComponent } from './Pages/patient-appointments/patient-appointments.component';
import {CreateConsultationComponent} from './Pages/create-consultation/create-consultation.component';
import { OrdonnancePageComponent } from './Pages/ordonnance-page/ordonnance-page.component';
import { DiagnosisDoctorComponent } from './Pages/diagnosis-doctor/diagnosis-doctor.component';
import { ExamDoctorComponent } from './Pages/exam-doctor/exam-doctor.component';
import { OrdonnanceTemComponent } from './Pages/ordonnance-tem/ordonnance-tem.component';
import  {DashboardPageComponent} from './Pages/dashboard-page/dashboard-page.component'
import { AddCarePageComponent} from './Pages/add-care-page/add-care-page.component'
export const routes: Routes = [
  { path: 'appointments', component: AppointmentsComponent },
  //{ path: 'profile', component: ProfilePageComponent },
  { path: 'login', component:HomeComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirection
  { path: 'appointment-details/:id', component: AppointmentsDetailsComponent },
  { path: 'profile/:id', component: PatientProfileComponent },
  {path: 'new-patient',component: AddPatientComponent},
  {
    path: 'edit-patient/:id',
    component:ModifyPatientComponent,
  },
  { path: 'doctor-profile', component: DoctorProfileComponent },
  {path:'patientlist',component:ListeDesPatientsComponent},
  {path:'PatientAppointments/:id',component:PatientAppointmentsComponent},
  {path:'add-appointment/:id',component:CreateConsultationComponent},
  { path: 'ordonnance/:consultationId', component: OrdonnancePageComponent },
  {path: 'diagnostic/:consultationId', component:DiagnosisDoctorComponent  },
  {path: 'exam/:consultationId', component:ExamDoctorComponent },
  {path:'ordonnanceTem', component:OrdonnanceTemComponent},
  {path:'dashboard', component:DashboardPageComponent},
  {path:'add-care/:consultationId', component: AddCarePageComponent}
];

export const AppRoutingModule = provideRouter(routes);
