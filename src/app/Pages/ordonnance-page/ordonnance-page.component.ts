import { Component } from '@angular/core';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { SidebarDoctorComponent } from '../../components/sidebar-doctor/sidebar-doctor.component';
import { OrdonnanceComponent } from "../../components/ordonnance/ordonnance.component";

@Component({
  selector: 'app-ordonnance-page',
  imports: [HeaderProfileComponent, SidebarDoctorComponent, OrdonnanceComponent],
  templateUrl: './ordonnance-page.component.html',
  styleUrl: './ordonnance-page.component.css'
})
export class OrdonnancePageComponent {

}
