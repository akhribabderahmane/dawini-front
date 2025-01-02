import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-inf',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar-inf.component.html',
  styleUrls: ['./sidebar-inf.component.css']
})
export class SidebarInfComponent implements OnInit {
  patientId?: number; // ID of the patient
  consultationId?: number; // ID of the consultation

  constructor(private route: ActivatedRoute, private router: Router) {}

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

  // Method to check if the current route matches the given route
  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
