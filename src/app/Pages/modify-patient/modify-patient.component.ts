import { Component } from '@angular/core';
import { EditPatientComponent } from '../../components/edit-patient/edit-patient.component';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modify-patient',
  imports: [EditPatientComponent,HeaderProfileComponent ,RouterModule ],
  templateUrl: './modify-patient.component.html',
  styleUrl: './modify-patient.component.css'
})
export class ModifyPatientComponent {
   constructor(private router: Router) {}
  onLogout() {
    localStorage.clear(); // Clear local storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
