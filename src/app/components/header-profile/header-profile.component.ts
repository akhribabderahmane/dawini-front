import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.css'],
})
export class HeaderProfileComponent implements OnInit {
  patientName: string = '';
  doctorName: string = '';

  ngOnInit() {
    // Retrieve patient and doctor info from local storage
    const patient = JSON.parse(localStorage.getItem('patient') || '{}');
    this.patientName = `${patient.nom} ${patient.prenom}`;
  }
}
