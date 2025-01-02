import { Component, OnInit } from '@angular/core';
import { ConsultationsService } from '../../services/consultations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

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
  doctor: string = 'default';


  patientId: string | null = null;
  isInfermier: boolean = false; // Flag to check if the user is an infermier

  constructor(
    private consultationsService: ConsultationsService,
    private userservice: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const patientId = localStorage.getItem('token') || '{}';
    
    this.userservice.getPatientDetails(patientId).subscribe(
      (data)=> {
        
        this.userservice.getDoctorDetails(data.medcin_traitant).subscribe(
          (data2) => {
            this.doctor = data2.user.nom;
          },
          (error) => {
            console.error('Error fetching doctor details:', error);
          }
        );


      },
      (error) =>{
        console.error('Erro fetching doctor: ', error);
      }
    )

    

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

  // Show ordonnance details in the modal
  viewOrdonnanceDetails(consultation_id: number): void {
    this.consultationsService.getConsultationDetails(`${consultation_id}`).subscribe(
      (data) => {
        this.ordonnanceDetails = data.ordonnance; // Set ordonnance details
        this.showModal = true; // Show the modal
        console.log(this.ordonnanceDetails);
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

  doctorgetter(): string{
    return this.doctor;
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
