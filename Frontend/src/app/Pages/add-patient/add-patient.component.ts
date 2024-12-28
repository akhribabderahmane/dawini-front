import { Component } from '@angular/core';
import { NewPatientComponent } from '../../components/new-patient/new-patient.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
@Component({
  selector: 'app-add-patient-page',
  imports: [NewPatientComponent,HeaderProfileComponent,SidebarComponent ],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientpage {

}
