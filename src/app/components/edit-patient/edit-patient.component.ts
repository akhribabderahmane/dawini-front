/* import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-patient',
  standalone: true,
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css'],
  imports: [NgIf, NgFor, FormsModule, HttpClientModule],
})
export class EditPatientComponent {
  @Input() patientId!: number; // Passed from parent component or route
  patient: any = {};
  dpi: any = {};
  doctors: any[] = [];
  modalMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDoctors();
    this.loadPatientDetails();
  }

  fetchDoctors() {
    this.http.get('/api/doctors').subscribe(
      (data: any) => {
        this.doctors = data;
        console.log('Doctors fetched:', data);
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  loadPatientDetails() {
    this.http.get(`/api/patients/${this.patientId}`).subscribe(
      (data: any) => {
        this.patient = data;
        this.loadDpiDetails(data.dpi_id); // Load linked DPI details
      },
      (error) => {
        console.error('Error fetching patient details:', error);
      }
    );
  }

  loadDpiDetails(dpiId: number) {
    this.http.get(`/api/dpi/${dpiId}`).subscribe(
      (data: any) => {
        this.dpi = data;
        console.log('DPI details fetched:', data);
      },
      (error) => {
        console.error('Error fetching DPI details:', error);
      }
    );
  }

  onSubmit() {
    const patientPayload = {
      ...this.patient,
    };

    this.http.put(`/api/patients/${this.patientId}`, patientPayload).subscribe(
      () => {
        this.updateDpiDetails(); // Update DPI after patient
      },
      (error) => {
        console.error('Error updating patient:', error);
        this.showModal('Failed to update patient information.');
      }
    );
  }

  updateDpiDetails() {
    this.http.put(`/api/dpi/${this.dpi.id}`, this.dpi).subscribe(
      () => {
        this.showModal('Patient and DPI information updated successfully!');
      },
      (error) => {
        console.error('Error updating DPI:', error);
        this.showModal('Failed to update DPI information.');
      }
    );
  }

  showModal(message: string) {
    this.modalMessage = message;
  }

  closeModal() {
    this.modalMessage = null;
  }

  discard() {
    this.loadPatientDetails(); // Reload original details
  }
}
*/
import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-patient',
  standalone: true,
  templateUrl: './edit-patient.component.html',
  styleUrls: ['../new-patient/new-patient.component.css'],
  imports: [NgIf, NgFor, FormsModule, HttpClientModule],
})
export class EditPatientComponent {
  @Input() patientId!: number; // Patient ID passed from parent component or route
  patient: any = {};
  user: any = {}; // User details
  dpi: any = {};
  doctors: any[] = [];
  modalMessage: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    console.log('Editing patient with ID:', this.patientId);
    this.fetchDoctors();
    this.loadPatientDetails();
  }

  // Fetch doctors from local JSON
  fetchDoctors() {
    this.http.get('/Doctorlist.json').subscribe(
      (data: any) => {
        this.doctors = data;
        console.log('Doctors fetched:', data);
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  // Load patient details and associated user details
  loadPatientDetails() {
    this.http.get('/Patientlist.json').subscribe(
      (patients: any) => {
        const patient = patients.find((p: any) => p.id === this.patientId);
        if (patient) {
          this.patient = patient;
          this.loadUserDetails(patient.user_id); // Fetch linked User details
          this.loadDpiDetails(patient.dpi_id);  // Fetch linked DPI details
        } else {
          console.error('Patient not found');
        }
      },
      (error) => {
        console.error('Error fetching patient details:', error);
      }
    );
  }

  // Load User details from local JSON
  loadUserDetails(userId: number) {
    this.http.get('/Users.json').subscribe(
      (users: any) => {
        const user = users.find((u: any) => u.id === userId);
        if (user) {
          this.user = user;
          console.log('User details fetched:', user);
        } else {
          console.error('User not found');
        }
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  // Load DPI details from local JSON
  loadDpiDetails(dpiId: number) {
    this.http.get('/Dpilist.json').subscribe(
      (dpis: any) => {
        const dpi = dpis.find((d: any) => d.id === dpiId);
        if (dpi) {
          this.dpi = dpi;
          console.log('DPI details fetched:', dpi);
        } else {
          console.error('DPI not found');
        }
      },
      (error) => {
        console.error('Error fetching DPI details:', error);
      }
    );
  }

  // Save updates to local JSON (simulation)
  onSubmit() {
    this.http.get('/Patientlist.json').subscribe(
      (patients: any) => {
        const patientIndex = patients.findIndex((p: any) => p.id === this.patientId);
        if (patientIndex !== -1) {
          patients[patientIndex] = this.patient;
          console.log('Updated Patient:', this.patient);
        } else {
          console.error('Patient not found');
        }

        this.http.get('/Users.json').subscribe((users: any) => {
          const userIndex = users.findIndex((u: any) => u.id === this.patient.user_id);
          if (userIndex !== -1) {
            users[userIndex] = this.user;
            console.log('Updated User:', this.user);
          } else {
            console.error('User not found');
          }

          this.http.get('/Dpilist.json').subscribe((dpis: any) => {
            const dpiIndex = dpis.findIndex((d: any) => d.id === this.dpi.id);
            if (dpiIndex !== -1) {
              dpis[dpiIndex] = this.dpi;
              console.log('Updated DPI:', this.dpi);
            } else {
              console.error('DPI not found');
            }

            this.showModal('Patient, User, and DPI information updated successfully!');
          });
        });
      },
      (error) => {
        console.error('Error updating patient:', error);
        this.showModal('Failed to update patient information.');
      }
    );
  }

  showModal(message: string) {
    this.modalMessage = message;
  }

  closeModal() {
    this.modalMessage = null;
  }

  discard() {
    this.loadPatientDetails(); // Reload original details
  }
}

