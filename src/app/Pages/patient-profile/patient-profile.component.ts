import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultationsService } from '../../services/consultations.service';
import { UserService } from '../../services/user.service';
import * as moment from 'moment'; // Import moment
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-patient-profile',
  imports: [HeaderProfileComponent, SidebarComponent,CommonModule],
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css'],
})
export class PatientProfileComponent implements OnInit {
  patientDetails: any = null;
  doctorDetails: any = null;
  appointments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private consultationsService: ConsultationsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');

    if (patientId) {
      // Fetch patient details
      this.userService.getPatientDetails(patientId).subscribe(
        (data) => {
          this.patientDetails = data;

          // Fetch treating doctor's details
          if (data.medcin_traitant_id) {
            this.fetchDoctorDetails(data.medcin_traitant_id);
          }
        },
        (error) => {
          console.error('Error fetching patient details:', error);
        }
      );

      // Fetch and process appointments
      this.consultationsService.getConsultations(patientId).subscribe(
        (data) => {
          this.appointments = this.processAppointments(data);
        },
        (error) => {
          console.error('Error fetching appointments:', error);
        }
      );
    }
  }

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

  private processAppointments(appointments: any[]): any[] {
   

    // Use moment.default() instead of moment()
    const currentDate = moment.default();
    
    ; // Create current moment object
  
    return appointments
      .filter((appointment) => moment.default(appointment.date).isAfter(currentDate)) // Keep future appointments
      .map((appointment) => {
        const appointmentDate = moment.default(appointment.date);
  
        // Determine dynamic status
        let status = '';
        if (appointmentDate.isSame(currentDate, 'day')) {
          status = 'today';
        } else if (appointmentDate.isSame(currentDate.clone().add(1, 'week'), 'week')) {
          status = 'this week';
        } else if (appointmentDate.isSame(currentDate.clone().add(2, 'week'), 'week')) {
          status = 'next week';
        }
  
        // Add calculated status
        return { ...appointment, status };
      });
  }
  
}
