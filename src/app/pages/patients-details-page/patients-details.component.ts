
import { Component ,  OnInit } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import {  HeaderComponent } from "../../components/header/header.component";
import { PatientDetailsComponent } from '../../components/patient-details/patient-details.component';
import {  ConsultationTableComponent } from "../../components/consultation-table/consultation-table.component";
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute to access route parameters

@Component({
  selector: 'app-patient-details-page',
  imports: [HeaderComponent, PatientDetailsComponent, SidebarComponent, HeaderComponent, ConsultationTableComponent],
  templateUrl: './patients-details-page.component.html',
  styleUrls: ['./patients-details-page.component.css']  // Correction ici, 'styleUrls' au lieu de 'styleUrl'
})
export class PatientsDetailspage implements OnInit {
 

  constructor(private route: ActivatedRoute) {}
  patientId: string | null = null; // To store the patient ID from the route



  ngOnInit(): void {
    // Subscribe to the route parameters to get the patient ID
    this.route.paramMap.subscribe(params => {
      this.patientId = params.get('id'); // Retrieve the 'id' parameter from the route
      console.log('Patient ID:', this.patientId); // Log the patient ID for debugging
    });
  }
}