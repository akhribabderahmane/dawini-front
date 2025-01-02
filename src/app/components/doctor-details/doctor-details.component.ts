import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-doctor-details',
  imports:[CommonModule],
  standalone: true,
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
})
export class DoctorDetailsComponent implements OnInit {
  doctorNom: string | null = null;
  doctorPrenom: string | null = null;

  ngOnInit(): void {
    // Retrieve doctor's name and surname from localStorage
    this.doctorNom = localStorage.getItem('doctorNom');
    this.doctorPrenom = localStorage.getItem('doctorPrenom');

    if (!this.doctorNom || !this.doctorPrenom) {
      console.warn('Doctor name or surname not found in localStorage.');
    }
  }
}
