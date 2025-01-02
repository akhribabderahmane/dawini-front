import { Component } from '@angular/core';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { SidebarDoctorComponent } from '../../components/sidebar-doctor/sidebar-doctor.component';
import {AddAppointmentComponent} from '../../components/add-appointment/add-appointment.component'
@Component({
  selector: 'app-create-consultation',
  imports: [HeaderProfileComponent, SidebarDoctorComponent,AddAppointmentComponent],
  templateUrl: './create-consultation.component.html',
  styleUrl: './create-consultation.component.css'
})
export class CreateConsultationComponent {

}
