import { Component } from '@angular/core';
import { NewPatientComponent } from '../../components/new-patient/new-patient.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-patient',
  imports: [NewPatientComponent,HeaderProfileComponent,RouterModule ],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent {
  constructor(private router: Router) {}
  onLogout() {
    localStorage.clear(); // Clear local storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
