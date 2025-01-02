import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsultationsService } from '../../services/consultations.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-appointment',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css'],
})
export class AddAppointmentComponent implements OnInit {
  consultationDate: string = ''; // Date de la consultation
  dpiId!: number; // ID du DPI
  patientId!: string | null; // ID du patient
  consultationId!: number | null; // ID de la consultation créée
  consultations: any[] = [];
  constructor(
    private consultationService: ConsultationsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du patient depuis l'URL ou le localStorage
    const patientId = this.route.snapshot.paramMap.get('id') ?? localStorage.getItem('currentPatientId');
    if (!patientId) {
      console.error('Patient ID is null or undefined.');
      return; // Stop further execution
    }
    this.patientId = patientId;

    // Appeler le service pour obtenir les détails du patient
    this.consultationService.getPatientDetails(Number(patientId)).subscribe({
      next: (patient) => {
        //this.dpiId = patient.dpi_id; // Récupérer dynamiquement le DPI ID
        console.log('DPI ID récupéré:', this.dpiId);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails du patient:', err);
      },
    });
  }

  // Créer une consultation
  createConsultation(): void {
    if (!this.dpiId || !this.consultationDate) {
      alert('Veuillez fournir une date pour la consultation.');
      return;
    }

    const newConsultation = {
      dpi_id: this.dpiId,
      date: this.consultationDate,
      diagnostic: '',
      resume: '',
      ordonnance_id: null, // L'ordonnance sera associée plus tard
    };

    this.consultationService.createConsultation(newConsultation).subscribe({
      next: (response) => {
        console.log('Consultation créée avec succès:', response);
        //this.consultationId = response.id; // Récupérer l'ID de la consultation créée

        if (this.consultationId !== null) {
          localStorage.setItem('currentConsultationId', this.consultationId.toString());
        } else {
          console.error('Consultation ID is null or undefined.');
        }
        localStorage.setItem('selectedConsultationDate', this.consultationDate);

        // Naviguer vers la page de création d'ordonnance
        this.router.navigate(['/ordonnance', this.consultationId]);
      },
      error: (err) => {
        console.error('Erreur lors de la création de la consultation:', err);
        alert('Erreur lors de la création de la consultation.');
      },
    });
  }

  // Annuler et revenir à la liste des rendez-vous
  cancel(): void {
    this.consultationDate = ''; // Réinitialisation de la date
    this.router.navigate(['/PatientAppointments', this.patientId]); // Navigation vers la page des rendez-vous
  }
}
