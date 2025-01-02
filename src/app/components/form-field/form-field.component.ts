

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import to get route parameters
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // For API calls

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
  imports: [FormsModule, CommonModule], // Add FormsModule to the imports
})
export class FormFieldComponent implements OnInit {
  type: string = 'dropdown';
  careOptions: string[] = ['Injection', 'Blood Test', 'Nursing Care'];
  statusOptions: string[] = ['Stable', 'Critical', 'Worsening'];
  placeholder: string = 'Enter value';

  consultationId: string | null = ''; // Consultation ID from URL
  patientDetails: { nom: string; prenom: string; nss: string } | null = null;

  // Object to hold care data
  careData = {
    consultation_id: '', // Filled with consultationId
    infermier_id: '', // Replace with the logged-in nurse ID
    type_soin: '',
    etat_patient: '',
    date_soin: '',
    observation: '',
  };

  private apiUrl = 'https://your-api-url.com/api/soins'; // Replace with actual API endpoint

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Get consultation ID from the URL
    this.consultationId = this.route.snapshot.paramMap.get('consultationId');

    if (this.consultationId) {
      this.careData.consultation_id = this.consultationId; // Bind to careData
    }

    // Fetch patient details from localStorage
    const nom = localStorage.getItem('patientNom') || '';
    const prenom = localStorage.getItem('patientPrenom') || '';
    const nss = localStorage.getItem('patientNss') || '';

    if (nom && prenom && nss) {
      this.patientDetails = { nom, prenom, nss };
    }

    // Set nurse ID dynamically (replace with actual logic for logged-in user)
    this.careData.infermier_id = localStorage.getItem('infermierId') || '1'; // Example ID
  }
   selectCareType(careType: string): void {
    console.log("Selected Care Type:", careType);
    // Set this care type to your model or form control
  }
  // Save the care record
  save(): void {
    if (
      !this.careData.type_soin ||
      !this.careData.etat_patient ||
      !this.careData.date_soin ||
      !this.careData.observation
    ) {
      alert('All fields are required!');
      return;
    }

    this.http.post(this.apiUrl, this.careData).subscribe({
      next: (response) => {
        console.log('Care record saved successfully:', response);
        alert('Care record created successfully.');

        // Redirect to another page if needed
        this.router.navigate(['/appointment-details', this.consultationId]);
      },
      error: (error) => {
        console.error('Error saving care record:', error);
        alert('Failed to create care record. Please try again.');
      },
    });
  }

  // Discard changes and reset the form
  discard(): void {
    this.careData = {
      consultation_id: this.consultationId || '',
      infermier_id: localStorage.getItem('loggedInNurseId') || '1',
      type_soin: '',
      etat_patient: '',
      date_soin: '',
      observation: '',
    };
    alert('Changes discarded.');
  }
}

