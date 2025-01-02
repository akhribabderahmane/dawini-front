import { Component, OnInit } from '@angular/core';
import { ConsultationsService } from '../../services/consultations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments-table',
  standalone: true,
  templateUrl: './appointments-table.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./appointments-table.component.css'],
})
export class AppointmentstableComponent implements OnInit {
  consultations: any[] = [];
  filteredConsultations: any[] = [];
  showModal: boolean = false;
  ordonnanceDetails: any = null;
  currentPage: number = 1; // Current page number
  pageSize: number = 5;
  patientId: string | null = null;
  isInfermier: boolean = false; // Flag to check if the user is an infermier

  constructor(
    private consultationsService: ConsultationsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check user role from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isInfermier = user.role === 'infermier';

    this.patientId = this.route.snapshot.paramMap.get('id') || localStorage.getItem('currentPatientId');
    if (this.patientId) {
      this.consultationsService.getConsultations(this.patientId).subscribe(
        (data) => {
          this.consultations = data || [];
          this.filteredConsultations = [...this.consultations];
        },
        (error) => {
          console.error('Error fetching consultations:', error);
        }
      );
    } else {
      console.error('Patient ID is missing');
    }
  }

  viewOrdonnanceDetails(ordonnanceId: number): void {
    this.consultationsService.getOrdonnanceDetails(ordonnanceId.toString()).subscribe(
      (data) => {
        this.ordonnanceDetails = data; // Set ordonnance details
        this.showModal = true; // Show the modal
      },
      (error) => {
        console.error('Error fetching ordonnance details:', error);
      }
    );
  }

  goToAddCare(consultationId: number): void {
    // Navigate to the add care page with consultationId
    localStorage.setItem('currentConsultationId', consultationId.toString());
    this.router.navigate(['/add-care', consultationId]);
  }

  get paginatedConsultations(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredConsultations.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

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

  closeModal(): void {
    this.showModal = false;
    this.ordonnanceDetails = null; // Reset ordonnance details
  }

  viewDetails(consultationId: number): void {
    localStorage.setItem('currentConsultationId', consultationId.toString());
    this.router.navigate(['/appointment-details', consultationId]);
  }

  filterByDate(): void {
    if (this.selectedDate) {
      this.filteredConsultations = this.consultations.filter((consultation) =>
        consultation.date.startsWith(this.selectedDate)
      );
    } else {
      this.filteredConsultations = [...this.consultations];
    }
  }

  selectedDate: string | null = null; // Stores the selected date
  
}
