import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { CommonModule } from '@angular/common'; // For common Angular functionality
import { FormsModule } from '@angular/forms'; // For handling forms
import { Router } from '@angular/router'; // Import Router
import { FilterPipe } from "../../filter.pipe"; // If you have a custom filter pipe

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterPipe, // Custom filter pipe if needed
  ],
  templateUrl: './patient-Data.component.html',
  styleUrls: ['./patient-Data.component.css'],
})
export class LoginComponent implements OnInit {

  searchQuery: string = ''; // Used for search functionality
  patients: any[] = []; // Holds the list of patients

  constructor(private http: HttpClient, private router: Router) {} // Inject HttpClient and Router

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    // Fetching data from the data1.json file
    this.http.get<any[]>('/data1.json').subscribe({
      next: (data) => {
        this.patients = data; // Assign fetched data to patients array
        console.log('Patient data loaded:', this.patients); // Log data for debugging
      },
      error: (error) => {
        console.error('Error loading patient data:', error);
        alert(
          'Failed to load patient data. Please check the console for more details.'
        );
      },
    });
  }

  // Navigate to patient details
  navigateTo(id: string): void {
    this.router.navigate([`/patients-details/${id}`]);  // Pass the id in the URL
  }

  // Navigate to AddPatientPage when New Patient button is clicked
  goToAddPatient(): void {
    this.router.navigate(['/AddPatientpage']); // Navigate to AddPatientpage route
  }
}
