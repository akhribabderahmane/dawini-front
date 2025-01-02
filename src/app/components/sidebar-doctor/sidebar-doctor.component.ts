import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar-doctor',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar-doctor.component.html',
  styleUrls: ['./sidebar-doctor.component.css'],
})
export class SidebarDoctorComponent {
  patientId?: number; // ID du patient
  consultationId?: number; // ID de la consultation

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    const storedPatientId = localStorage.getItem('currentPatientId');
    this.patientId = storedPatientId ? Number(storedPatientId) : undefined;

    const storedConsultationId = localStorage.getItem('currentConsultationId');
    this.consultationId = storedConsultationId ? Number(storedConsultationId) : undefined;

    console.log('Loaded IDs:', { patientId: this.patientId, consultationId: this.consultationId });
  }
  onLogout() {
    localStorage.clear(); // Clear local storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
