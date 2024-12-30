/*import { Component, OnInit } from '@angular/core';
import { ConsultationsService } from '../../services/consultations.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-appointments-table',
  templateUrl: './appointments-table.component.html',
  imports: [CommonModule],
  styleUrls: ['./appointments-table.component.css'],
})
export class AppointmentstableComponent implements OnInit {
  consultations: any[] = []; // List of consultations

  constructor(
    private consultationsService: ConsultationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const patientId = '123'; // Replace with dynamic patient ID
    this.consultationsService.getConsultations(patientId).subscribe(
      (data) => {
        this.consultations = data;
      },
      (error) => {
        console.error('Error fetching consultations:', error);
      }
    );
  }

  // Show ordonnance details in a modal
  viewOrdonnanceDetails(ordonnanceId: number): void {
    this.consultationsService.getOrdonnanceDetails(ordonnanceId.toString()).subscribe(
      (data) => {
        alert(`Ordonnance: ${JSON.stringify(data, null, 2)}`); // Replace with modal
      },
      (error) => {
        console.error('Error fetching ordonnance details:', error);
      }
    );
  }
  
// Fetch details, save in service, and navigate
  viewDetails(consultationId: number): void {
    this.consultationsService.getConsultationDetails(consultationId.toString()).subscribe(
      (data) => {
        // Save the details in the service
        this.consultationsService.setConsultationDetails(data);

        // Redirect to the details page
        this.router.navigate(['/appointment-details', consultationId]);
      },
      (error) => {
        console.error('Error fetching consultation details:', error);
      }
    );
  }
}
*/
/*import { Component, OnInit } from '@angular/core';
import { ConsultationsService } from '../../services/consultations.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-appointments-table',
  standalone: true,
  templateUrl: './appointments-table.component.html',
  imports: [CommonModule,FormsModule,HttpClientModule  ],
  styleUrls: ['./appointments-table.component.css'],
})
export class AppointmentstableComponent implements OnInit {
  consultations: any[] = [];
  filteredConsultations: any[] = [];
  showModal: boolean = false;
  ordonnanceDetails: any = null;
  currentPage: number = 1; // Current page number
  pageSize: number = 5;
  constructor(
    private consultationsService: ConsultationsService,
    private router: Router
  ) { console.log('ConsultationsService injected successfully:', consultationsService);}

  ngOnInit(): void {
    const patientId = '123'; // Remplacez '123' par l'identifiant du patient réel
    this.consultationsService.getConsultations(patientId).subscribe(
      (data) => {
        this.consultations = data || [];
        this.filteredConsultations = [...this.consultations];
      },
      (error) => {
        console.error('Error fetching consultations:', error);
      }
    );
  }
  

  viewOrdonnanceDetails(ordonnanceId: number): void {
    this.consultationsService.getOrdonnanceDetails(ordonnanceId.toString()).subscribe(
      (data) => {
        this.ordonnanceDetails = data;
        this.showModal = true;
      },
      (error) => {
        console.error('Error fetching ordonnance details:', error);
      }
    );
  }
  
  get paginatedConsultations(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredConsultations.slice(startIndex, endIndex);
  }

  // Go to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage * this.pageSize < this.filteredConsultations.length) {
      this.currentPage++;
    }
  }
  get totalPages(): number {
    return Math.ceil(this.filteredConsultations.length / this.pageSize);
  }
  
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  
  goToPage(page: number): void {
    this.currentPage = page;
  }
  
  // Close the modal
  closeModal(): void {
    this.showModal = false;
    this.ordonnanceDetails = null; // Reset ordonnance details
  }

  viewDetails(consultationId: number): void {
    this.router.navigate(['/appointment-details', consultationId]);
  }
  selectedDate: string | null = null; // Stocke la date sélectionnée

filterByDate(): void {
  if (this.selectedDate) {
    this.filteredConsultations = this.consultations.filter((consultation) =>
      consultation.date.startsWith(this.selectedDate)
    );
  } else {
    this.filteredConsultations = [...this.consultations];
  }
}

}*/
import { Component, OnInit, Input } from '@angular/core';
import { ConsultationsService } from '../../services/consultations.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments-table',
  standalone: true,
  templateUrl: './appointments-table.component.html',
  imports: [CommonModule,FormsModule ],
  styleUrls: ['./appointments-table.component.css'],
})
export class AppointmentstableComponent implements OnInit {
  @Input() userRole: string= "patient";  // Receive the userRole input
  @Input() patientId: any;
  consultations: any[] = [];
  filteredConsultations: any[] = [];
  showModal: boolean = false;
  ordonnanceDetails: any = null;
  currentPage: number = 1; // Current page number
  pageSize: number = 5;
  constructor(
    private consultationsService: ConsultationsService,
    private router: Router
  ) {}

    ngOnInit(): void {
      if (this.userRole === 'patient') {
        // Fetch all consultations for the patient
        this.consultationsService.getConsultations().subscribe(
          (data) => {
            this.consultations = data || [];
            this.filteredConsultations = [...this.consultations];
          },
          (error) => {
            console.error('Error fetching consultations:', error);
          }
        );
      } else if (this.userRole === 'radiologist' && this.patientId) {
        // Fetch consultations for a specific patient
        this.consultationsService.getAppointments(this.patientId).subscribe(
          (data) => {
            this.consultations = data || [];
            this.filteredConsultations = [...this.consultations];
          },
          (error) => {
            console.error('Error fetching appointments:', error);
          }
        );
      } else {
        console.warn('No valid patient details provided for radiologist role.');
      }
    }
    
  

  // Show ordonnance details in the modal
  viewOrdonnanceDetails(ordonnanceId: number): void {
    this.consultationsService.getOrdonnanceDetails(ordonnanceId).subscribe(
      (data) => {
        this.ordonnanceDetails = data; // Set ordonnance details
        this.showModal = true; // Show the modal
      },
      (error) => {
        console.error('Error fetching ordonnance details:', error);
      }
    );
  }
  get paginatedConsultations(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredConsultations.slice(startIndex, endIndex);
  }

  // Go to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage * this.pageSize < this.filteredConsultations.length) {
      this.currentPage++;
    }
  }
  get totalPages(): number {
    return Math.ceil(this.filteredConsultations.length / this.pageSize);
  }
  
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  
  goToPage(page: number): void {
    this.currentPage = page;
  }
  
  // Close the modal
  closeModal(): void {
    this.showModal = false;
    this.ordonnanceDetails = null; // Reset ordonnance details
  }

  viewDetails(consultationId: number ): void {
    this.router.navigate(['/appointment-details', consultationId, this.userRole]);
  }
  selectedDate: string | null = null; // Stocke la date sélectionnée

filterByDate(): void {
  if (this.selectedDate) {
    this.filteredConsultations = this.consultations.filter((consultation) =>
      consultation.date.startsWith(this.selectedDate)
    );
  } else {
    this.filteredConsultations = [...this.consultations];
  }
}

}

