import { Component, OnInit } from '@angular/core';
import { ConsultationsService } from '../../services/consultations.service';
import { Router } from '@angular/router';
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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  // Static values for appointments, patients, doctors, and lab tests
  appointments: number = 23;
  patients: number = 44;
  doctors: number = 654;
  labTests: number = 98;

}
