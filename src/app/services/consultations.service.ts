/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class ConsultationsService {
  private apiBaseUrl = 'http://localhost:3000/api'; // Update with your backend URL
  private consultationDetails: any = null;
  constructor(private http: HttpClient) {} 

  getConsultations(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/consultations/${patientId}`);
  }

  getOrdonnanceDetails(ordonnanceId: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/ordonnance/${ordonnanceId}`);
  }

  getConsultationDetails(consultationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/consultation/${consultationId}`);
  }
    // Save consultation details
  setConsultationDetails(details: any): void {
    this.consultationDetails = details;
  }

  // Retrieve saved consultation details
  getConsultationDetailsFromCache(): any {
    return this.consultationDetails;
  }
    
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root',
})
export class ConsultationsService {
  constructor(private http: HttpClient) {}

  private consultationDetails: any = null;

  // Fetch consultations
  getConsultations(): Observable<any[]> {
    return this.http.get<any[]>('/mock-consultations.json');
  }//there is probleme here we have to get consultation bu patient id
  getAppointments(patientId: string): Observable<any[]> {
   // return this.http.get<any[]>(`${this.apiBaseUrl}/appointments/${patientId}`);
   return this.http.get<any[]>(`/mock-appointments/${patientId}.json`);
  }
  
  // Fetch ordonnance details by ID
  getOrdonnanceDetails(ordonnanceId: number): Observable<any> {
    return this.http.get<any>(`/mock-ordonnances.json`).pipe(
      map((data: any) => data[ordonnanceId]) // Extract specific ordonnance
    );
  }

  // Fetch consultation details by ID
  getConsultationDetails(consultationId: string): Observable<any> {
    return this.http.get<any>(`/mock-consultation-details.json`);
  }

  // Fetch medical history (Dpi) by ID
  getDpiById(dpiId: string): Observable<any> {
    return this.http.get<any>(`/mock-dpi/${dpiId}.json`);
  }

  // Fetch exams by consultation ID
  getExamsByConsultationId(consultationId: string): Observable<any[]> {
    return this.http.get<any[]>(`/mock-exams.json`).pipe(
      map((data: any[]) => data.filter((exam) => exam.consultation_id === +consultationId))
    );
  }

  // Fetch soins by consultation ID
  getSoinsByConsultationId(consultationId: string): Observable<any[]> {
    return this.http.get<any[]>(`/mock-soins.json`).pipe(
      map((data: any[]) => data.filter((soin) => soin.consulration_id === +consultationId))
    );
  }

  // Save consultation details
  setConsultationDetails(details: any): void {
    this.consultationDetails = details;
  }

  // Retrieve saved consultation details
  getConsultationDetailsFromCache(): any {
    return this.consultationDetails;
  }
}
