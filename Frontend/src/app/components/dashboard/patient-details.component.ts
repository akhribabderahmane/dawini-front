import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Pour récupérer l'ID du patient à partir de l'URL
import { PatientService } from '../../services/patients.service'; // Ajuste le chemin si nécessaire

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  patientData: any; // Stocke les informations du patient

  constructor(
    private route: ActivatedRoute, // Injecte ActivatedRoute pour récupérer les paramètres de l'URL
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du patient depuis l'URL
    const patientId = Number(this.route.snapshot.paramMap.get('id'));

    // Charger les détails du patient via le service
    this.patientService.getPatientDetails(patientId).subscribe(
      (data) => {
        console.log('Données du patient:', data); // Vérification des données reçues
        this.patientData = data;
      },
      (error) => {
        console.error('Erreur de récupération des données:', error);
      }
    );
  }
}