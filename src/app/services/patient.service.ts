import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  // Récupérer les détails de la consultation du patient
  getPatientDetails(patientId: number): Observable<any> {
    return this.http.get<any>('assets/patient-details.json').pipe(
      map((data: any[]) => data.find((patient: any) => patient.id === patientId)) // Utilisation de 'any' pour 'patient'
    );
  }

  // Récupérer les données des examens
  getExams(): Observable<any[]> {
    return this.http.get<any[]>('assets/exams.json');
  }

  // Récupérer l'historique médical
  getMedicalHistory(patientId: number): Observable<any> {
    return this.http.get<any>('assets/medical-history.json').pipe(
      map((data: any[]) => data.find((history: any) => history.patientId === patientId))
    );
  }
}