import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultationsService } from '../../services/consultations.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { CommonModule } from '@angular/common';
import { Sidebar1Component } from "../../components/sidebar1/sidebar1.component";

@Component({
  selector: 'app-appointments-details',
  imports: [CommonModule, SidebarComponent, HeaderProfileComponent, Sidebar1Component],
  templateUrl: './appointments-details.component.html',
  styleUrls: ['./appointments-details.component.css'],
})
export class AppointmentsDetailsComponent implements OnInit {
  appointmentId: string = '';
  userRole: string = ''; // Add userRole property
  appointmentDetails: any = null;
  medicalHistory: any = null;
  exams: any[] = [];
  soins: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private consultationsService: ConsultationsService
  ) {}

  ngOnInit(): void {
    // Retrieve the appointmentId and userRole from the route parameters
    this.route.params.subscribe(params => {
      this.appointmentId = params['id']; // Access the appointmentId
      this.userRole = params['userRole']; // Access the userRole

      // Now use the appointmentId and userRole
      if (this.appointmentId) {
        this.consultationsService.getConsultationDetails(this.appointmentId).subscribe(
          (data) => {
            this.appointmentDetails = data;

            // Fetch medical history
            if (this.appointmentDetails?.dpi_id) {
              this.fetchMedicalHistory(this.appointmentDetails.dpi_id);
            }

            // Fetch exams
            this.fetchExams(this.appointmentId);

            // Fetch soins
            this.fetchSoins(this.appointmentId);
          },
          (error) => {
            console.error('Error fetching appointment details:', error);
          }
        );
      } else {
        console.error('Appointment ID is null or undefined');
      }
    });
  }

  private fetchMedicalHistory(dpiId: string): void {
    this.consultationsService.getDpiById(dpiId).subscribe(
      (data) => {
        this.medicalHistory = {
          antecedants: data.antecedants,
          bilanBiologique: data.bilan_biologique,
        };
      },
      (error) => {
        console.error('Error fetching medical history:', error);
      }
    );
  }

  private fetchExams(consultationId: string): void {
    if (consultationId) {
      this.consultationsService.getExamsByConsultationId(consultationId).subscribe(
        (data) => {
          if (data && data.length > 0) {
            this.exams = data;
            console.log('Exams fetched:', this.exams);
          } else {
            console.warn('No exams found for this consultation.');
          }
        },
        (error) => {
          console.error('Error fetching exams:', error);
        }
      );
    } else {
      console.warn('Consultation ID is invalid.');
    }
  }

  private fetchSoins(consultationId: string): void {
    if (consultationId) {
      this.consultationsService.getSoinsByConsultationId(consultationId).subscribe(
        (data) => {
          this.soins = data;
        },
        (error) => {
          console.error('Error fetching soins:', error);
        }
      );
    }
  }
}
