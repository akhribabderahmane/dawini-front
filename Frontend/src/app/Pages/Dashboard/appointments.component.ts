import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AppointmentstableComponent } from '../../components/appointments-table/appointments-table.component';

import { AboutComponent } from "../../components/DashComponent/about.component"; 
@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [ CommonModule, HeaderProfileComponent, SidebarComponent, AppointmentstableComponent, AboutComponent],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent {}
