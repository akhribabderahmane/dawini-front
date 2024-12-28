
import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import {  HeaderComponent } from "../../components/header/header.component";
import { PatientDetailsComponent } from '../../components/dashboard/patient-details.component';
import {  ConsultationTableComponent } from "../../components/consultation-table/consultation-table.component";

@Component({
  selector: 'app-patient-details-page',
  imports: [HeaderComponent, PatientDetailsComponent, SidebarComponent, HeaderComponent, ConsultationTableComponent],
 
  templateUrl: './patients-details-page.component.html',
  styleUrls: ['./patients-details-page.component.css']  // Correction ici, 'styleUrls' au lieu de 'styleUrl'
})
export class PatientsDetailspage {
  // Ici vous pouvez ajouter des logiques spécifiques si besoin
}