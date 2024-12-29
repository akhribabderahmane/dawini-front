import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Router } from '@angular/router'; // Import Router for navigation
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common';
import { FilterPipe } from "../../filter.pipe";  // Adjust the path if needed

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, FilterPipe], // Include only modules
  templateUrl: './patient-Data.component.html',
  styleUrls: ['./patient-Data.component.css'],
})
export class LoginComponent {
  searchQuery: string = ''; // Define the search query variable
  patients: any[] = []; // Define an array for patients

  constructor(private http: HttpClient, private router: Router) {} // Inject Router

  ngOnInit() {
    // Example: Fetching patient data using HttpClient
    this.http.get<any[]>('data1.json').subscribe(
      (data) => {
        this.patients = data;
        console.log('Data fetched successfully:', this.patients);
      },
      (error) => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Check console for details.');
      }
    );
  }

  // Method to navigate to patient details page with patient ID
  goToPatientDetails(patientId: string): void {
    this.router.navigate(['/patients-details-page', patientId]); // Navigate to patient-details page with patientId
  }

  // Optional: Existing method for AddCare page (if needed)
  goToAddCare(patientId: string) {
    this.router.navigate(['/add-care', patientId]); // Navigate to add-care page with patientId
  }
}
