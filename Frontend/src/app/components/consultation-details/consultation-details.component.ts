import { Component, OnInit } from '@angular/core';
import { PatientService } from './../../services/patient.service'; // Modifie le chemin si nécessaire
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consultation-details',
  templateUrl: './consultation-details.component.html',
  styleUrls: ['./consultation-details.component.css']
})
export class ConsultationDetailsComponent implements OnInit {
  appointmentDetails: any; // Déclare cette propriété pour éviter l'erreur
  exams: any[] = []; // Exemples de données d'examen
  medicalHistory: any; // Exemple d'historique médical

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    const patientId = 123; // Remplace par l'ID réel du patient
    this.patientService.getPatientDetails(patientId).subscribe((data) => {
      this.appointmentDetails = data; // Assigne les données de l'appointment
    });

    this.patientService.getExams().subscribe((data) => {
      this.exams = data; // Assigne les examens
    });

    this.patientService.getMedicalHistory(patientId).subscribe((data) => {
      this.medicalHistory = data; // Assigne l'historique médical
    });
  }
}
