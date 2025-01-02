import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor.service'; // Import DoctorService
import { SidebarDoctorComponent } from "../../components/sidebar-doctor/sidebar-doctor.component";
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
@Component({
  selector: 'app-diagnosis-doctor',
  templateUrl: './diagnosis-doctor.component.html',
  styleUrls: ['./diagnosis-doctor.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    SidebarDoctorComponent,
    HeaderProfileComponent
  ],
})
export class DiagnosisDoctorComponent implements OnInit {
  patientId: number | undefined; // Patient ID from the route
  consultationId: string | null = null; // Consultation ID
  diagnosis = {
    text: '', // Field for the diagnosis text
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService // Inject the service
  ) {}

  ngOnInit(): void {
    // Retrieve the patientId and consultationId from the route parameters or localStorage
    this.patientId = Number(this.route.snapshot.paramMap.get('patientId'));
    this.consultationId =
      this.route.snapshot.paramMap.get('consultationId') ||
      localStorage.getItem('currentConsultationId');

    console.log('Patient ID:', this.patientId);
    console.log('Consultation ID:', this.consultationId);

    // Load saved diagnosis from localStorage if available
    const savedDiagnosis = localStorage.getItem('currentDiagnosis');
    if (savedDiagnosis) {
      this.diagnosis = JSON.parse(savedDiagnosis);
    }
  }

  adjustTextAreaHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height to allow recalculation
    textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`; // Set height dynamically, max 300px
  }

  saveDiagnosisToLocal(): void {
    // Save diagnosis to localStorage
    const diagnosisData = {
      consultationId: this.consultationId,
      ...this.diagnosis,
    };
    localStorage.setItem('currentDiagnosis', JSON.stringify(diagnosisData));
    console.log('Diagnosis saved to localStorage:', diagnosisData);
  }

  onRequestExam(): void {
    this.router.navigate(['/exam', this.consultationId]); // Redirect to exam page
  }

  onCancel(): void {
    console.log('Cancel button clicked.');
    this.diagnosis.text = ''; // Clear the input field
  }  

  onNext(): void {
    if (this.consultationId) {
      // Save to localStorage first
      this.saveDiagnosisToLocal();
      const consultationData = { diagnostic: this.diagnosis }; 
      // Call the service to save the diagnosis
       this.doctorService.saveOrUpdateConsultation(Number(this.consultationId), consultationData).subscribe({
        next: (response) => {
          console.log('Diagnosis saved successfully:', response);
          this.router.navigate(['/appointment-details', this.consultationId]);
          // Navigate to next step
        },
        error: (error) => {
          console.error('Error saving diagnosis:', error);
        },
      });
    }
  }
}
