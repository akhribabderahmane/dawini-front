import { Component, OnInit } from '@angular/core';
import { ConsultationsService } from './../../services/consultations.service';

@Component({
  selector: 'app-consultation-table',
  templateUrl: './consultation-table.component.html',
  styleUrls: ['./consultation-table.component.css'],
})
export class ConsultationTableComponent implements OnInit {
  consultations: any[] = [];
  
  constructor(private consultationsService: ConsultationsService) {}

  ngOnInit(): void {
    // Charger les consultations depuis le service
    this.consultationsService.getConsultations().subscribe(
      (data) => {
        console.log('Consultations récupérées:', data);
        this.consultations = data;  // Assigner les consultations aux données récupérées
      },
      (error) => {
        console.error('Erreur lors du chargement des consultations:', error);
      }
    );
  }
}
