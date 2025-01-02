import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { SidebarDoctorComponent } from '../../components/sidebar-doctor/sidebar-doctor.component';
import { AppointmentstableComponent } from '../../components/appointments-table/appointments-table.component';
import { PatientDetailsComponent } from '../../components/patient-details/patient-details.component';
import { RouterModule } from '@angular/router';
import { SidebarInfComponent } from '../../components/sidebar-inf/sidebar-inf.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-patient-appointments',
  imports: [AppointmentstableComponent, HeaderProfileComponent,SidebarInfComponent, RouterModule,SidebarDoctorComponent, PatientDetailsComponent, CommonModule],
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css'],
})
export class PatientAppointmentsComponent implements OnInit {
  userRole: string | undefined;
  patientId: number | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUserRole();
    this.getPatientId();
  }

  // Method to check if the user is a doctor
  getUserRole(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userRole = user.role;
    console.log('User Role:', this.userRole);
  }

  // Retrieve the patient ID from the route parameters
  getPatientId(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Patient ID:', this.patientId);
  }

  // Navigate to the Add Appointment page with the patient ID
  onAddAppointment(): void {
    if (this.patientId) {
      this.router.navigate(['/add-appointment', this.patientId]);
    } else {
      console.error('Patient ID is not available');
    }
  }
  onLogout() {
    localStorage.clear(); // Clear local storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
