import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Login request
  login(username: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, {"role": "patient","email":username, "password": password});
  }
  

  // Fetch admin data
  fetchAdminData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/patients`);
  }

  // Fetch medecin data
  fetchMedecinData(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/medecin/${userId}`);
  }

  // Fetch pharmacie data
  fetchPharmacieData(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pharmacie/${userId}`);
  }

  // Fetch patients data for infermier, laboratin, or radiologue
  fetchPatientsData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/patients`);
  }
  getPatientDetails(patientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/patients/${patientId}/`);
    //return this.http.get(`${this.apiUrl}/patients/patients/${patientId}.json`);
  }

  // Fetch doctor details
  getDoctorDetails(doctorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/${doctorId}/`);
    //return this.http.get(`/doctors/${doctorId}.json`);
  }
  getInfermierId(userId: number): Observable<any> {
    return this.http.get<any>(`/api/infermiers?user_id=${userId}`);
  }
  
}