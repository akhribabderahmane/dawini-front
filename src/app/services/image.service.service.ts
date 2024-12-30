import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private jsonUrl = '/images.json';

  constructor(private http: HttpClient) {}

  getImages(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }


  // Méthode pour ajouter une image au fichier JSON
  addImage(imageData: any): Observable<any> {
    // Vous pouvez utiliser un service backend pour stocker ces données de manière persistante.
    return this.http.post(this.jsonUrl, imageData); // Remplacez cette logique par un appel à un API backend pour une véritable sauvegarde.
  }
}
