import { Component, OnInit, Renderer2 } from '@angular/core';
import { ImageService } from '../../services/image.service.service';
import { ObservationRadiologueComponent } from "../observation-radiologue/observation-radiologue.component";
import { SidebarRadiologueComponent } from "../sidebar-radiologue/sidebar-radiologue.component";

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css'],
  imports: [ObservationRadiologueComponent, ObservationRadiologueComponent],
})
export class DataPageComponent implements OnInit {
  images: any[] = []; // Données récupérées depuis le fichier JSON

  constructor(private imageService: ImageService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadImages();
  }

  // Charger les données depuis le service
  loadImages(): void {
    this.imageService.getImages().subscribe(
      (data) => {
        this.images = data; // Récupérer les données
        this.populateTable(); // Insérer dynamiquement les données dans le tableau
      },
      (error) => {
        console.error('Erreur lors du chargement des images :', error);
      }
    );
  }

  // Remplir le tableau avec les données
  populateTable(): void {
    const tableBody = document.querySelector('table tbody'); // Sélectionner le corps du tableau
    if (tableBody) {
      this.images.forEach((image, index) => {
        const row = this.renderer.createElement('tr');

        // Ajouter les cellules pour chaque colonne
        this.addCell(row, image.name);
        this.addCell(row, image.type);
        this.addCell(row, image.date);

        // Ajouter la colonne pour les actions
        const actionsCell = this.renderer.createElement('td');
       // Bouton Télécharger
          const downloadButton = this.createButton('Télécharger', () => this.downloadImage(image));
          this.renderer.appendChild(actionsCell, downloadButton);

// Bouton Supprimer avec style spécifique
const deleteButton = this.createButton('X', () => this.deleteImage(index), 'delete');
this.renderer.appendChild(actionsCell, deleteButton);


        this.renderer.appendChild(row, actionsCell); // Ajouter les actions à la ligne
        this.renderer.appendChild(tableBody, row);  // Ajouter la ligne au tableau
      });
    }
  }

  // Ajouter une cellule au tableau
  private addCell(row: HTMLElement, text: string): void {
    const cell = this.renderer.createElement('td');
    const textNode = this.renderer.createText(text);
    this.renderer.appendChild(cell, textNode);
    this.renderer.appendChild(row, cell);
  }

  // Créer un bouton
  // Créer un bouton avec styles spécifiques
// Créer un bouton avec styles spécifiques
private createButton(label: string, onClick: () => void, type: string = ''): HTMLElement {
  const button = this.renderer.createElement('button');
  const textNode = this.renderer.createText(label);
  this.renderer.appendChild(button, textNode);

  // Ajouter un gestionnaire d'événement
  this.renderer.listen(button, 'click', onClick);

  // Appliquer des styles spécifiques si c'est un bouton de suppression
  if (type === 'delete') {
    this.renderer.setStyle(button, 'color', '#FF6666'); // Rouge clair pour le texte
    this.renderer.setStyle(button, 'fontWeight', '300'); // Poids de police réduit
    this.renderer.setStyle(button, 'backgroundColor', 'transparent'); // Aucun fond
    this.renderer.setStyle(button, 'border', 'none'); // Pas de bordure
    this.renderer.setStyle(button, 'cursor', 'pointer');
    this.renderer.setStyle(button, 'fontSize', '16px'); // Taille de la police adaptée

    // Survol : Rouge un peu plus foncé
    this.renderer.listen(button, 'mouseover', () => {
      this.renderer.setStyle(button, 'color', '#FF3333'); // Rouge plus foncé
    });
    this.renderer.listen(button, 'mouseout', () => {
      this.renderer.setStyle(button, 'color', '#FF6666'); // Retour au rouge clair
    });
  }

  return button;
}

  


  // Télécharger une image
  downloadImage(image: any): void {
    console.log('Téléchargement de l\'image :', image.name);
    // Implémenter la logique de téléchargement ici
  }

  // Supprimer une image
  deleteImage(index: number): void {
    this.images.splice(index, 1); // Retirer l'image de la liste
    this.refreshTable(); // Mettre à jour le tableau
  }

  // Rafraîchir le tableau
  private refreshTable(): void {
    const tableBody = document.querySelector('table tbody');
    if (tableBody) {
      tableBody.innerHTML = ''; // Effacer les lignes existantes
      this.populateTable(); // Recréer les lignes
    }
  }
}
