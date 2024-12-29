import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import to get route parameters
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
  imports: [FormsModule, CommonModule] // Add FormsModule to the imports
})
export class FormFieldComponent implements OnInit {

  // Define your variables
  type: string = 'dropdown';
  careOptions: string[] = ['Injection', 'Blood Test', 'Nursing Care'];
  statusOptions: string[] = ['Stable', 'Critical', 'Worsening'];
  placeholder: string = 'Enter value';

  patientId: string | null = ''; // Patient ID from URL
  consultationId: string | null = ''; // Consultation ID from URL
  patientNss: string | null = ''; // Patient NSS

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get patient ID and consultation ID from the URL
    this.route.queryParamMap.subscribe(params => {
      this.patientId = params.get('patientId'); // Fetch patient ID
      this.consultationId = params.get('consultationId'); // Fetch consultation ID

      // Fetch NSS based on patient ID (simulate here)
      if (this.patientId) {
        this.fetchPatientNss(this.patientId);
      }
    });
  }

  fetchPatientNss(patientId: string): void {
    // Simulating an NSS fetch based on patientId (replace with actual service call)
    this.patientNss = `NSS-${patientId}`; // Example NSS value based on patientId
  }

  selectCareType(careType: string): void {
    console.log("Selected Care Type:", careType);
    // Set this care type to your model or form control
  }
}
