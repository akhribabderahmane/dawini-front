import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultationsService } from '../../services/consultations.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { CommonModule } from '@angular/common';
import { SidebarDoctorComponent } from '../../components/sidebar-doctor/sidebar-doctor.component';
import { Router } from '@angular/router';
import { SidebarInfComponent } from '../../components/sidebar-inf/sidebar-inf.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-appointments-details',
  imports: [ RouterModule,CommonModule, SidebarComponent, SidebarInfComponent, HeaderProfileComponent,SidebarDoctorComponent],
  templateUrl: './appointments-details.component.html',
  styleUrls: ['./appointments-details.component.css'],
})
export class AppointmentsDetailsComponent implements OnInit  {
  appointmentId: string = '';
  appointmentDetails: any = null;
  medicalHistory: any = null;
  exams: any[] = [];
  soins: any[] = [];
  userRole: string | undefined;
  patientId: string | null = null; 
  constructor(
    private route: ActivatedRoute,
    private consultationsService: ConsultationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserRole();
    this.patientId = localStorage.getItem('currentPatientId'); 
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.appointmentId = id;

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
  }
  getUserRole(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userRole = user.role;
    console.log('User Role:', this.userRole);
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
  onLogout(): void {
    localStorage.clear(); // Clear local storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
