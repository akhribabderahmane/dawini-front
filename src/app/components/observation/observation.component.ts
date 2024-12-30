import { Component } from '@angular/core';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent {
  observation: string = ''; // Observation pour le laboratoire

  // Méthode pour sauvegarder l'observation
  saveObservation(): void {
    console.log('Observation enregistrée: ', this.observation);
    // Tu peux ajouter ici un service pour envoyer cette observation à une base de données si nécessaire
  }
}