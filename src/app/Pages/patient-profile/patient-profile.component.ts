import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationsService } from '../../services/consultations.service';
import { UserService } from '../../services/user.service';
import * as moment from 'moment'; // Import moment
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Sidebar1Component } from "../../components/sidebar1/sidebar1.component";
import { NextappoinementComponent } from "../../components/nextappoinement/nextappoinement.component";
import { AppointmentstableComponent } from "../../components/appointments-table/appointments-table.component";
import { Page2RadiologueComponent } from "../page2-radiologue/page2-radiologue.component";

@Component({
  selector: 'app-patient-profile',
  imports: [HeaderProfileComponent, SidebarComponent, CommonModule, Sidebar1Component, NextappoinementComponent, AppointmentstableComponent, Page2RadiologueComponent],
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css'],
})
export class PatientProfileComponent implements OnInit {
  patientDetails: any = null;
  doctorDetails: any = null;
  appointments: any[] = [];
  patientId: string | null = null;
  userRole: string | null = null; // User role (patient or radiologist)
  activeTab: string = 'appointments'; // Default to 'appointments'

  constructor(
    private route: ActivatedRoute,
    private consultationsService: ConsultationsService,
    private userService: UserService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    // Fetch the role dynamically (from route or a service)
    this.userRole = this.route.snapshot.queryParamMap.get('role') || 'patient'; // Set default to patient if role isn't passed

    const patientId = this.route.snapshot.paramMap.get('id');

    if (patientId) {
      this.patientId = patientId;

      // Fetch patient details
      this.userService.getPatientDetails(Number(patientId)).subscribe(
        (data) => {
          this.patientDetails = data;

          // Fetch treating doctor's details if available
          if (data.medcin_traitant_id) {
            this.fetchDoctorDetails(data.medcin_traitant_id);
          }
        },
        (error) => {
          console.error('Error fetching patient details:', error);
        }
      );

      // Fetch and process appointments
      this.consultationsService.getAppointments(patientId).subscribe(
        (data) => {
          this.appointments = this.processAppointments(data);
        },
        (error) => {
          console.error('Error fetching appointments:', error);
        }
      );
    }
  }

  // Fetch doctor details based on doctor ID
  private fetchDoctorDetails(doctorId: string): void {
    this.userService.getDoctorDetails(doctorId).subscribe(
      (data) => {
        this.doctorDetails = data;
      },
      (error) => {
        console.error('Error fetching doctor details:', error);
      }
    );
  }

  // Process appointments to add status based on the current date
  private processAppointments(appointments: any[]): any[] {
    const currentDate = moment.default();

    return appointments
      .filter((appointment) => moment.default(appointment.date).isAfter(currentDate)) // Filter only future appointments
      .map((appointment) => {
        const appointmentDate = moment.default(appointment.date);

        // Determine dynamic status for the appointment
        let status = '';
        if (appointmentDate.isSame(currentDate, 'day')) {
          status = 'today';
        } else if (appointmentDate.isSame(currentDate.clone().add(1, 'week'), 'week')) {
          status = 'this week';
        } else if (appointmentDate.isSame(currentDate.clone().add(2, 'week'), 'week')) {
          status = 'next week';
        }

        // Return appointment with status
        return { ...appointment, status };
      });
  }
  selectTab(tab: string): void {
    this.activeTab = tab;
  }
  navigateToPatientInformation(route: string, id: number): void {
    // Ensure the route and id are passed correctly
    this.router.navigate([route, id]);
  }
  navigateToImport(type: string): void {
    if (type === 'image') {
      this.router.navigate(['/import-image']);
    } else if (type === 'excel') {
      this.router.navigate(['/import-excel']);
    }
  }
  
  
}
