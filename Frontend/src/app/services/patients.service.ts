import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  // Méthode pour obtenir les données du patient
  getPatientDetails(patientId: number): Observable<any> {
    return this.http.get<any>(`assets/patients.json`).pipe(
      map((data: any) => {
        const patient = data.find((patient: { id: number }) => patient.id === patientId);
        console.log('Patient trouvé:', patient); // Vérifie les données récupérées
        return patient;
      })
    );
  }
}