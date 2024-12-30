import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { Chart, registerables } from 'chart.js';
import { ObservationComponent } from "../observation/observation.component";
import { SidebarLaboratinComponent } from "../sidebar-laboratin/sidebar-laboratin.component";
import { HeaderLaboratinComponent } from "../header-laboratin/header-laboratin.component";


@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css'],
  imports: [ObservationComponent, SidebarLaboratinComponent, HeaderLaboratinComponent],
})
export class DataViewComponent implements OnInit {
  jsonData: any[] = []; // Données JSON
  chart: any;           // Graphique

  constructor(
    private dataService: DataStorageService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadJsonData();
  }

  // Charger les données JSON depuis le service
  loadJsonData(): void {
    this.dataService.getData().subscribe((data) => {
      this.jsonData = data;
      this.createChart();
      this.createTable(); // Créer le tableau manuellement
    });
  }

  // Créer un graphique à barres
  createChart(): void {
    const labels = this.jsonData.map((item) => item.le);
    const avantData = this.jsonData.map((item) => +item.avant);
    const apresData = this.jsonData.map((item) => +item.apres);

    const ctx = document.getElementById('chart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Avant',
            data: avantData,
            backgroundColor: '#59ABFF',
          },
          {
            label: 'Après',
            data: apresData,
            backgroundColor: '#695DEE',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: { enabled: true },
          legend: { display: true },
        },
      },
    });
  }

  // Créer le tableau manuellement
  createTable(): void {
    const table = this.el.nativeElement.querySelector('#dataTable');

    // Si la table existe, on la vide avant de la remplir à nouveau
    if (table) {
      table.innerHTML = ''; // Vider la table

      // Créer une ligne d'en-tête
      const headerRow = this.renderer.createElement('tr');
      this.renderer.appendChild(table, headerRow);

      // En-têtes de colonnes
      const headers = ['  ', 'Avant', 'Après'];
      headers.forEach((header) => {
        const th = this.renderer.createElement('th');
        const text = this.renderer.createText(header);
        this.renderer.appendChild(th, text);
        this.renderer.appendChild(headerRow, th);
      });

      // Créer les lignes du tableau avec les données
      this.jsonData.forEach((item) => {
        const row = this.renderer.createElement('tr');
        this.renderer.appendChild(table, row);

        const typeCell = this.renderer.createElement('td');
        const avantCell = this.renderer.createElement('td');
        const apresCell = this.renderer.createElement('td');

        const typeText = this.renderer.createText(item.le);
        const avantText = this.renderer.createText(item.avant);
        const apresText = this.renderer.createText(item.apres);

        this.renderer.appendChild(typeCell, typeText);
        this.renderer.appendChild(avantCell, avantText);
        this.renderer.appendChild(apresCell, apresText);

        this.renderer.appendChild(row, typeCell);
        this.renderer.appendChild(row, avantCell);
        this.renderer.appendChild(row, apresCell);
      });
    }
  }
}