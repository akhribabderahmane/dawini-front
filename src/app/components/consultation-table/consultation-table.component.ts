import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Added Router for navigation
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultation-table',
  templateUrl: './consultation-table.component.html',
  standalone: true,
  styleUrls: ['./consultation-table.component.css'],
  imports: [CommonModule],
})
export class ConsultationTableComponent implements OnInit {
  consultations: any[] = [];
  patientId: number = 0; // Default value to 0
  buttonLabels: string[] = []; // Array to store button labels ("Check" or "Non Check")

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router // Added Router for navigation
  ) {}

  ngOnInit(): void {
    // Retrieve the patientId from the URL, with a fallback to 0 if not found
    const id = this.route.snapshot.paramMap.get('id');
    this.patientId = id ? +id : 0;

    if (this.patientId === 0) {
      console.error('Invalid patient ID');
    }

    // Fetch consultations from the 'patient-info.json' file
    this.http.get<any[]>('/patient-info.json').subscribe(
      (data) => {
        const patient = data.find((p) => p.id === this.patientId);
        if (patient && patient.consultations) {
          this.consultations = patient.consultations;
          this.buttonLabels = Array(this.consultations.length).fill('Check');
        } else {
          console.error('Consultations not found for this patient');
        }
      },
      (error) => {
        console.error('Error fetching consultations:', error);
      }
    );
  }

  // Method to toggle the button text between "Check" and "Non Check"
  toggleCheck(index: number): void {
    this.buttonLabels[index] =
      this.buttonLabels[index] === 'Check' ? 'Non Check' : 'Check';
  }

  // Method to navigate to the Add Care page with patientId and consultationId
  goToAddCare(patientId: number, consultationId: number): void {
    this.router.navigate(['/add-care'], {
      queryParams: { patientId, consultationId },
    });
  }
}
