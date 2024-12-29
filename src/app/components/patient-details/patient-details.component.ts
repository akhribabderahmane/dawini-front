import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Import HttpClient to make HTTP requests

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patientData: any;
  patientMedicalData: any;

  constructor(
    private route: ActivatedRoute, // To get route parameters like patient ID
    private http: HttpClient      // To make HTTP requests
  ) {}

  ngOnInit(): void {
    const patientId = +this.route.snapshot.paramMap.get('id')!; // Get patientId from route params

    // Fetch patient details from 'patients.json'
    this.http.get<any[]>('patients.json').subscribe(data => {
      this.patientData = data.find(patient => patient.id === patientId);
      if (!this.patientData) {
        console.error('Patient not found');
      }
    }, error => {
      console.error('Error fetching patient data:', error);
    });

    // Fetch patient medical data from 'patient-info.json'
    this.http.get<any[]>('patient-info.json').subscribe(data => {
      this.patientMedicalData = data.find(info => info.id === patientId);
      if (!this.patientMedicalData) {
        console.error('Medical data not found');
      }
    }, error => {
      console.error('Error fetching medical data:', error);
    });
  }
}
