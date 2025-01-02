import { Component,OnInit } from '@angular/core';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-page',
  imports: [DashboardComponent,HeaderProfileComponent,RouterModule ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {
  patientId: string | null = null; // Define patientId property

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Retrieve patientId from localStorage
    this.patientId = localStorage.getItem('currentPatientId');

    if (!this.patientId) {
      console.warn('No patientId found in localStorage.');
    }
  }

  onLogout(): void {
    localStorage.clear(); // Clear local storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
