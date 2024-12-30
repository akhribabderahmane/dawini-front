import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from '../../services/image.service.service';
import {  SidebarRadiologueComponent } from "../../components/sidebar-radiologue/sidebar-radiologue.component";
import { HeaderRadiologueComponent } from "../../components/header-radiologue/header-radiologue.component";

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css'],
  imports: [ HeaderRadiologueComponent, SidebarRadiologueComponent],
})
export class ImportDataComponent {
  fileType: string = '';
  selectedFile: any;

  constructor(private router: Router, private imageService: ImageService) {}

  // Lorsqu'un fichier est sélectionné
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Importer l'image
  importImage(): void {
   // if (this.selectedFile && this.fileType) {
      const imageName = this.selectedFile.name;
      const date = new Date().toLocaleDateString();

      this.imageService.addImage({
        name: imageName,
        type: this.fileType,
        date: date,
      });

      this.router.navigate(['/view-images']); // Redirection vers la 2ème page
    //} else {
     // alert('Veuillez sélectionner une image et un type.');
    }
  }
