import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'https://your-api-url.com'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Save or update consultation (includes diagnosis)
  saveOrUpdateConsultation(consultationId: number, consultationData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/consultations/${consultationId}`, consultationData);
  }

  // Create an exam for a specific consultation
  createExamForConsultation(consultationId: number, examData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/consultations/${consultationId}/exams`, examData);
  }
}
