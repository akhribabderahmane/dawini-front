import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  appointmentList: any[] = [];
  doctorList: any[] = [];
  status: any = {};
  appointments: number = 0;
  patients: number = 0;
  doctors: number = 0;
  labTests: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetching data from the JSON file
    this.http.get<any>('/data.json').subscribe((data) => {
      this.appointmentList = data.appointmentList;
      this.doctorList = data.doctorList;
      this.status = data.status;

      // Setting the statistics (appointments, patients, etc.)
      this.appointments = data.appointment;
      this.patients = data.patients;
      this.doctors = data.doctors;
      this.labTests = data.labTests;
    });
  }
}
