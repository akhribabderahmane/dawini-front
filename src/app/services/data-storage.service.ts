import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  setData(jsonData: unknown[]) {
    throw new Error('Method not implemented.');
  }
  private jsonUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}