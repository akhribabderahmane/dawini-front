import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarDoctorComponent } from "../../components/sidebar-doctor/sidebar-doctor.component";
import { DoctorService } from '../../services/doctor.service';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
@Component({
  selector: 'app-exam-doctor',
  imports: [CommonModule, FormsModule, SidebarDoctorComponent,HeaderProfileComponent],
  templateUrl: './exam-doctor.component.html',
  styleUrls: ['./exam-doctor.component.css'],
})
export class ExamDoctorComponent implements OnInit {
  patientId: number | undefined; // Patient ID from the route
  consultationId: string | null = null;
  exam = {
    date: '',
    type_examen: '',
    comments: '',
  };



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService // Inject the DoctorService
  ) {}

  ngOnInit(): void {
    this.consultationId =
    this.route.snapshot.paramMap.get('consultationId') || localStorage.getItem('currentConsultationId');
    this.patientId = Number(this.route.snapshot.paramMap.get('patientId'));
    console.log('Patient ID:', this.patientId);

    
  }

  onCancel(): void {
    this.exam.type_examen = '';
    this.exam.comments = '';
    this.exam.date='';
  }

  onNext(): void {
    if (this.consultationId) {
      // Call the saveExam method in the DoctorService
      this.saveExam();
    }
    else {
      console.error('Consultation ID is missing.');
    } // Navigate to the diagnosis page this navigation in fact it should be on the saveexamforpatient but since we dont have the api url yet i did it here just for tests ^^

  }

  // Method to simulate saving the exam to a patient
  saveExam(): void {
    if (this.consultationId) {
      const examData = {
        type_examen: this.exam.type_examen,
      };
      this.doctorService.createExamForConsultation(Number(this.consultationId), examData).subscribe({
        next: (response) => {
          console.log('Exam saved successfully:', response);
          this.router.navigate(['/appointment-details', this.consultationId]);
          // Navigate to summary or next step
        },
        error: (error) => {
          console.error('Error saving exam:', error);
        },
      });
  }
}
}