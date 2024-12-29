import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';

// Importing Components
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { ObservationsComponent } from '../../components/observations/observations.component';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';

@Component({
  selector: 'app-add-care',
  templateUrl: './add-care.component.html',
  styleUrls: ['./add-care.component.css'],
  imports: [
    SidebarComponent,
    HeaderComponent,
    FormFieldComponent,
    ObservationsComponent,
    ActionButtonsComponent
  ]
})
export class AddCarepage implements OnInit {
  // Patient Data Variables
  patientId: string | null = '';
  consultationId: string | null = '';
  patientNss: string = '';
  careType: string = '';
  patientStatus: string = '';
  nurseObservations: string = ''; // New field for nurse's observations

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve query parameters from URL
    this.patientId = this.route.snapshot.queryParamMap.get('patientId');
    this.consultationId = this.route.snapshot.queryParamMap.get('consultationId');
    this.patientNss = this.route.snapshot.queryParamMap.get('patientNss') || '';
    this.careType = this.route.snapshot.queryParamMap.get('careType') || '';
    this.patientStatus = this.route.snapshot.queryParamMap.get('patientStatus') || '';

    // Log parameters for debugging
    console.log('Patient ID:', this.patientId);
    console.log('Consultation ID:', this.consultationId);
    console.log('Patient NSS:', this.patientNss);
    console.log('Care Type:', this.careType);
    console.log('Patient Status:', this.patientStatus);
  }

  savePatientData(): void {
    // Log all values for debugging
    console.log('Saving Data:', {
      patientId: this.patientId,
      consultationId: this.consultationId,
      patientNss: this.patientNss,
      careType: this.careType,
      patientStatus: this.patientStatus,
      nurseObservations: this.nurseObservations,
    });
  
    // Construct JSON data
    const patientData = {
      patientId: this.patientId,
      consultationId: this.consultationId,
      patientNss: this.patientNss,
      careType: this.careType,
      patientStatus: this.patientStatus,
      nurseObservations: this.nurseObservations,
    };
  
    // Save JSON file
    const jsonData = JSON.stringify(patientData, null, 2); // Pretty print JSON
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'patient_data.json');
  }
  

  discard(): void {
    // Reset all data fields
    this.patientId = '';
    this.consultationId = '';
    this.patientNss = '';
    this.careType = '';
    this.patientStatus = '';
    this.nurseObservations = ''; // Reset observations
  }
}
