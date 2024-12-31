import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://your-backend-url/api'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Login request
  login(username: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password, role });
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
    return this.http.get(`${this.apiUrl}/patients`);
  }
  getPatientDetails(patientId: string): Observable<any> {
    //return this.http.get(`${this.apiUrl}/patients/${patientId}`);
    return this.http.get(`/patients/${patientId}.json`);
  }

  // Fetch doctor details
  getDoctorDetails(doctorId: string): Observable<any> {
  //  return this.http.get(`${this.apiUrl}/doctors/${doctorId}`);
    return this.http.get(`/doctors/${doctorId}.json`);
  }
}
