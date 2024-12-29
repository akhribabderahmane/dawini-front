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
    
}
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root',
})
export class ConsultationsService {
  constructor(private http: HttpClient) {}

  // Fetch consultations
  getConsultations(): Observable<any[]> {
    return this.http.get<any[]>('assets/consultations.json');
  }

 
  
    
}
