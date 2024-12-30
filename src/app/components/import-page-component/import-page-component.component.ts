import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-import-page',
  templateUrl: './import-page-component.component.html',
  styleUrls: ['./import-page-component.component.css'],
})
export class ImportPageComponent {
  fileName: string = '';
  message: string = '';

 constructor(
  private DataStorageService: DataStorageService,
  public router: Router // Ici, nous avons rendu 'router' public
) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        this.DataStorageService.setData(jsonData);

        this.message = `Votre fichier Excel "${this.fileName}" a été bien importé avec succès.`;

        // Rediriger vers la page "data-view" après l'importation
        setTimeout(() => this.router.navigate(['/data-view']), 1000);
      };
      reader.readAsArrayBuffer(file);
    } else {
      this.message = 'Aucun fichier sélectionné. Veuillez réessayer.';
    }
  }
}