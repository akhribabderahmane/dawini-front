import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AppointmentstableComponent } from '../../components/appointments-table/appointments-table.component';
import { HttpClientModule } from '@angular/common/http'; 
@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [HttpClientModule,CommonModule, HeaderProfileComponent, SidebarComponent, AppointmentstableComponent ],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent {}
