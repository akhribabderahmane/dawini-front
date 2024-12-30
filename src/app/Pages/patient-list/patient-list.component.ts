import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar1Component } from "../../components/sidebar1/sidebar1.component";

@Component({
  selector: 'app-patient-list',
  standalone: true,
  templateUrl: './patient-list.component.html',
  imports: [CommonModule, FormsModule, Sidebar1Component],
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];
  filteredPatients: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  searchText: string = '';
  selectedDate: string | null = null; // To store the selected date
  showModal: boolean = false; // To control modal visibility
  patientDetails: any = null; // To store patient details for modal
  searchNSS: string = '';
  
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.userService.fetchPatientsData().subscribe(
      (data) => {
        this.patients = data;
        this.filteredPatients = [...this.patients];
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  // Handle search filter
  filterPatients(): void {
    const search = this.searchText.toLowerCase();
    this.filteredPatients = this.patients.filter((patient) =>
      patient.nss.toLowerCase().includes(search)
    );
  }
  searchByNSS(nssInput: string): void {
    // Validate the NSS input to ensure it's exactly 15 digits
    if (!/^\d{15}$/.test(nssInput)) {
      alert('Please enter a valid NSS with exactly 15 digits.');
      return;
    }
  
    // Filter for the patient with the specific NSS
    const matchedPatient = this.patients.find(patient => patient.nss === nssInput);
  
    // If a patient is found, update the filteredPatients array
    if (matchedPatient) {
      this.filteredPatients = [matchedPatient];
    } else {
      // If no patient is found, show an alert and clear the filteredPatients array
      alert('No patient found with the specified NSS.');
      // Reset pagination to ensure proper display
    this.goToPage(1);
    }
  
    
  }
  
  
  // Filter by selected date
  filterByDate(): void {
    if (this.selectedDate) {
      this.filteredPatients = this.patients.filter((patient) =>
        patient.date && patient.date.startsWith(this.selectedDate)
      );
    } else {
      this.filteredPatients = [...this.patients];
    }
  }

  get paginatedPatients(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredPatients.slice(startIndex, endIndex);
  }

  // Pagination logic
  nextPage(): void {
    if (this.currentPage * this.pageSize < this.filteredPatients.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPatients.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
  viewProfile(patientId: string): void {
    const userRole = 'radiologist'; // or dynamically determine the role
    this.router.navigate(['/profile', patientId], { queryParams: { role: userRole } });
  }

  // Close modal
  closeModal(): void {
    this.showModal = false;
    this.patientDetails = null;
  }

  // Navigate to patient details page
  viewDetails(patientId: string): void {
    this.router.navigate(['/profile', patientId]);
  }
}
