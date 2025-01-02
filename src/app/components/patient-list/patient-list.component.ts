import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-patient-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  isDoctor: boolean = false; // Flag to determine if the user is a doctor
  searchQuery: string = ''; // For search
  patients: any[] = []; // List of patients
  displayedPatients: any[] = []; // Paginated patients
  currentPage: number = 1; // Current page
  pageSize: number = 5; // Patients per page
  isAdminOrDoctor: boolean = false; 
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.checkUserRole(); // Determine if the user is a doctor
    this.loadPatients();
  }

  // Determine the user's role
  checkUserRole(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isDoctor = user.role === 'medecin';
    this.isAdminOrDoctor = user.role === 'admin' || user.role === 'medecin';
  }

  // Fetch patients from backend or JSON
  loadPatients(): void {
    this.http.get<any[]>('/Patientlist.json').subscribe({
      next: (data) => {
        // Map the data to flatten the nested structure
        this.patients = data.map((patient) => ({
          id: patient.id,
          nss: patient.nss,
          date_naissance: patient.date_naissance,
          addresse: patient.addresse,
          mutuelle: patient.mutuelle,
          medcin_traitant_id: patient.medcin_traitant_id,
          personne_contact: patient.personne_contact,
          dpi_id: patient.dpi_id,
          // Include user properties directly
          nom: patient.user.nom,
          prenom: patient.user.prenom,
          telephone: patient.user.telephone,
          email: patient.user.email,
        }));
        this.updateDisplayedPatients();
      },
      error: (error) => {
        console.error('Error loading patient data:', error);
        alert('Failed to load patient data. Please try again.');
      },
    });
  }
  

  // Update displayed patients based on current page
  updateDisplayedPatients(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedPatients = this.filteredPatients.slice(startIndex, endIndex);
  }

  // Filter patients based on role
  get filteredPatients(): any[] {
    if (!this.searchQuery) return this.patients;

    // Filter by NSS for doctors, or by name/first name for others
    if (this.isDoctor) {
      return this.patients.filter((patient) =>
        patient.nss.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      return this.patients.filter((patient) =>
        `${patient.nom} ${patient.prenom}`
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }
  }

  // Upload and scan QR code
  onQRUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Send QR code to the backend for processing
      this.http.post('/api/scan-qr', formData).subscribe({
        next: (response: any) => {
          const patientId = response.patientId;
          if (patientId) {
            // Navigate to patient profile if a match is found
            this.router.navigate([`/patients-details/${patientId}`]);
          } else {
            alert('No matching patient found for the scanned QR code.');
          }
        },
        error: (error) => {
          console.error('Error processing QR code:', error);
          alert('Failed to process QR code. Please try again.');
        },
      });
    }
  }

  // Pagination controls
  get totalPages(): number {
    return Math.ceil(this.filteredPatients.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedPatients();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedPatients();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedPatients();
    }
  }

  // Navigate to Add Patient page
  goToAddPatient(): void {
    this.router.navigate(['/new-patient']);
  }
  navigateTo(id: string, nom: string, prenom: string, nss: string): void {
    // Stocker l'ID du patient dans le localStorage
    localStorage.setItem('currentPatientId', id);
    localStorage.setItem('patientNom', nom);
    localStorage.setItem('patientPrenom', prenom);
    localStorage.setItem('patientNss', nss);
  
    // Naviguer vers la page des rendez-vous
    this.router.navigate([`PatientAppointments/${id}`]);
  }
  
  // Navigate to Edit Patient page
  goToEditPatient(patientId: number): void {
    this.router.navigate([`/edit-patient/${patientId}`]);
  }
}
