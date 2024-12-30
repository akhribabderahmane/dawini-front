import { Component } from '@angular/core';

@Component({
  selector: 'app-observation-radiologue',
  templateUrl: './observation-radiologue.component.html',
  styleUrls: ['./observation-radiologue.component.css']
})
export class ObservationRadiologueComponent {
  observation: string = ''; // Observation pour le laboratoire

  // Méthode pour sauvegarder l'observation
  saveObservation(): void {
    console.log('Observation enregistrée: ', this.observation);
    // Tu peux ajouter ici un service pour envoyer cette observation à une base de données si nécessaire
  }
}