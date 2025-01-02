import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class ConsultationsService {
  private apiBaseUrl = 'http://localhost:3000/api'; // Update with your backend URL
  private consultationDetails: any = null;
  private consultationId: number | null = null; // Store the consultation ID
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
    // Fetch patient details by patient ID
getPatientDetails(patientId: number): Observable<any> {
  return this.http.get<any>(`/patients/${patientId}.json`);
}

// Créer une nouvelle consultation (initialisation)
createConsultation(consultationData: any): Observable<any> {
  return this.http.post<any>(`${this.apiBaseUrl}/consultations`, consultationData);
}


 // Fetch DPI by ID
 getDpiById(dpiId: string): Observable<any> {
  return this.http.get<any>(`${this.apiBaseUrl}/dpi/${dpiId}`);
}

// Fetch exams by consultation ID
getExamsByConsultationId(consultationId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiBaseUrl}/exams/${consultationId}`);
}

// Fetch soins by consultation ID
getSoinsByConsultationId(consultationId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiBaseUrl}/soins/${consultationId}`);
}

// Method to set the consultation ID
setConsultationId(id: number): void {
  this.consultationId = id;
}

// Method to get the consultation ID (if needed later)
getConsultationId(): number | null {
  return this.consultationId;
}
}

