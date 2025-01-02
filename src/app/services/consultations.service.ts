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
    


  // Fetch exams by consultation ID
  getExamsByConsultationId(consultationId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/examinations/examens/by_consultation/?consultation_id=${consultationId}`);
  }

  // Fetch soins by consultation ID
  getSoinsByConsultationId(consultationId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/care/soins/soins_for_consultation/?consultation_id=${consultationId}`)
  }

// Method to set the consultation ID
setConsultationId(id: number): void {
  this.consultationId = id;
}

// Method to get the consultation ID (if needed later)
getConsultationId(): number | null {
  return this.consultationId;
}

getPatientDetails(patientId: number): Observable<any[]>{
  return this.http.get<any[]>('');
}

createConsultation(newConsultation: object): Observable<any[]>{
  return this.http.get<any[]>('');
}
}

