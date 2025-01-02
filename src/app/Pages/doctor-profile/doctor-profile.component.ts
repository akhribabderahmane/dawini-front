import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { SidebarDoctorComponent } from '../../components/sidebar-doctor/sidebar-doctor.component';
@Component({
  selector: 'app-doctor-profile',
  imports:[ CommonModule,HeaderProfileComponent,SidebarDoctorComponent],
  standalone: true,
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css'],
})
export class DoctorProfileComponent implements OnInit {
  doctorProfile: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Retrieve data from router state
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['data']) {
      this.doctorProfile = state['data'];
      console.log('Doctor Profile from state:', this.doctorProfile);
    } else {
      console.error('No doctor profile data found in router state');
    }
  }
}
