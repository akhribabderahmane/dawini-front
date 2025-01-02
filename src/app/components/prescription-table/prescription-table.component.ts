import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-prescription-table',
  imports:[CommonModule],
  templateUrl: './prescription-table.component.html',
  styleUrls: ['./prescription-table.component.css']
})
export class PrescriptionTableComponent implements OnInit {
  items: any[] = []; // Array to hold the list of medications

  ngOnInit(): void {
    // Retrieve the medicaments from localStorage
    const savedMedicaments = localStorage.getItem('savedMedicaments');
    if (savedMedicaments) {
      this.items = JSON.parse(savedMedicaments);
      console.log('Retrieved medications:', this.items);
    } else {
      console.warn('No medications found in localStorage.');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);
      // Add file handling logic here
    }
  }
}
