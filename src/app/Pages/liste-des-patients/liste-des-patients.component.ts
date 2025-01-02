import { Component , OnInit} from '@angular/core';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { SidebarDoctorComponent } from '../../components/sidebar-doctor/sidebar-doctor.component';
import { PatientListComponent } from '../../components/patient-list/patient-list.component';
import { CommonModule } from '@angular/common';
import { SidebarInfComponent } from '../../components/sidebar-inf/sidebar-inf.component';
@Component({
  selector: 'app-liste-des-patients',
  imports: [SidebarInfComponent,HeaderProfileComponent,SidebarDoctorComponent,RouterModule,PatientListComponent, CommonModule ],
  templateUrl: './liste-des-patients.component.html',
  styleUrl: './liste-des-patients.component.css'
})
export class ListeDesPatientsComponent implements OnInit {
  userRole: string | undefined;
  patientId: string | null = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUserRole();
    this.patientId = localStorage.getItem('currentPatientId');
  }
  getUserRole(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userRole = user.role;
    console.log('User Role:', this.userRole);
  }
  onLogout() {
    localStorage.clear(); // Clear local storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
