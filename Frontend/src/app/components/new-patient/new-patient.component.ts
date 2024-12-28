/*import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-patient',
  standalone: true,
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css'],
  imports: [NgIf, NgFor, FormsModule, HttpClientModule],
})
export class NewPatientComponent {
  // Patient data
  patient = {
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    nss: '',
    address: null,
    mutuelle: null,
    date_naissance: null,
    medcin_traitant_id: null,
    personne_contact: null,
  };

  // DPI data
  dpi = {
    antecedents: '',
    bilan_biologique: '',
  };

  doctors: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDoctors();
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

  onSubmit() {
    if (!this.patient.firstname || !this.patient.lastname || !this.patient.phone || !this.patient.email || !this.patient.nss) {
      this.showModal('Please fill in all required fields.');
      return;
    }

    // Step 1: Create the DPI record with today's date
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); // Format as 'YYYY-MM-DD'
    const dpiPayload = {
      antecedents: this.dpi.antecedents || '',
      bilan_biologique: this.dpi.bilan_biologique || '',
      created_at: today,
    };

    this.http.post('/api/dpi', dpiPayload).subscribe(
      (dpiResponse: any) => {
        const dpiId = dpiResponse.id;

        // Step 2: Create the User record
        const userPayload = {
          nom: this.patient.firstname,
          prenom: this.patient.lastname,
          telephone: this.patient.phone,
          email: this.patient.email,
          role: 'patient',
        };

        this.http.post('/api/users', userPayload).subscribe(
          (userResponse: any) => {
            const userId = userResponse.id;

            // Step 3: Create the Patient record
            const patientPayload = {
              user_id: userId,
              nss: this.patient.nss,
              date_naissance: this.patient.date_naissance,
              addresse: this.patient.address || '',
              mutuelle: this.patient.mutuelle || '',
              medcin_traitant_id: this.patient.medcin_traitant_id,
              personne_contact: this.patient.personne_contact || '',
              dpi_id: dpiId,
            };

            this.http.post('/api/patients', patientPayload).subscribe(
              () => {
                this.showModal('Patient added successfully!');
                this.discard();
              },
              (error) => {
                console.error('Error creating patient:', error);
                this.showModal('Failed to create patient. Please try again.');
              }
            );
          },
          (error) => {
            console.error('Error creating user:', error);
            this.showModal('Failed to create user. Please try again.');
          }
        );
      },
      (error) => {
        console.error('Error creating DPI:', error);
        this.showModal('Failed to create DPI. Please try again.');
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
    this.patient = {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      nss: '',
      address: null,
      mutuelle: null,
      date_naissance: null,
      medcin_traitant_id: null,
      personne_contact: null,
    };
    this.dpi = {
      antecedents: '',
      bilan_biologique: '',
    };
  }
}

*/
import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-patient',
  standalone: true,
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css'],
  imports: [NgIf, NgFor, FormsModule, HttpClientModule],
})
export class NewPatientComponent {
  // Patient data
  patient = {
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    nss: '',
    address: null,
    mutuelle: null,
    date_naissance: null,
    medcin_traitant_id: null,
    personne_contact: null,
  };

  // DPI data
  dpi = {
    antecedents: '',
    bilan_biologique: '',
  };

  doctors: any[] = [];
  modalMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDoctors();
  }

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

  onSubmit() {
    if (!this.patient.firstname || !this.patient.lastname || !this.patient.phone || !this.patient.email || !this.patient.nss) {
      this.showModal('Please fill in all required fields.');
      return;
    }

    // Step 1: Create the DPI record with today's date
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    const dpiPayload = {
      antecedents: this.dpi.antecedents || '',
      bilan_biologique: this.dpi.bilan_biologique || '',
      created_at: today,
    };

    this.http.get('/Dpilist.json').subscribe((dpis: any) => {
      const dpiArray = Array.isArray(dpis) ? dpis : []; // Default to empty array if null
      const newDpiId = dpiArray.length + 1;
      const newDpi = { id: newDpiId, ...dpiPayload };

      dpiArray.push(newDpi); // Add to the array
      console.log('New DPI added:', newDpi);

      // Step 2: Create the User record
      const userPayload = {
        nom: this.patient.firstname,
        prenom: this.patient.lastname,
        telephone: this.patient.phone,
        email: this.patient.email,
        role: 'patient',
      };

      this.http.get('/Users.json').subscribe((users: any) => {
        const userArray = Array.isArray(users) ? users : []; // Default to empty array if null
        const newUserId = userArray.length + 1;
        const newUser = { id: newUserId, ...userPayload };

        userArray.push(newUser); // Add to the array
        console.log('New User added:', newUser);

        // Step 3: Create the Patient record
        this.http.get('/Patientlist.json').subscribe((patients: any) => {
          const patientArray = Array.isArray(patients) ? patients : []; // Default to empty array if null
          const newPatientId = patientArray.length + 1;
          const patientPayload = {
            id: newPatientId,
            user_id: newUserId,
            nss: this.patient.nss,
            date_naissance: this.patient.date_naissance,
            addresse: this.patient.address || '',
            mutuelle: this.patient.mutuelle || '',
            medcin_traitant_id: this.patient.medcin_traitant_id,
            personne_contact: this.patient.personne_contact || '',
            dpi_id: newDpiId,
          };

          patientArray.push(patientPayload); // Add to the array
          console.log('New Patient added:', patientPayload);

          this.showModal('Patient added successfully!');
          this.discard(); // Reset the form
        });
      });
    });
  }

  showModal(message: string) {
    this.modalMessage = message;
  }

  closeModal() {
    this.modalMessage = null;
  }

  discard() {
    this.patient = {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      nss: '',
      address: null,
      mutuelle: null,
      date_naissance: null,
      medcin_traitant_id: null,
      personne_contact: null,
    };
    this.dpi = {
      antecedents: '',
      bilan_biologique: '',
    };
  }
}





