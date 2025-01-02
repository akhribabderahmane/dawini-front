import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver'; // Import FileSaver library

@Component({
  selector: 'app-ordonnance',
  standalone: true,
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css'],
  imports: [CommonModule, FormsModule],
})
export class OrdonnanceComponent implements OnInit {
  consultationId: string | null = null; // ID of the associated consultation
  formData = {
    nom: '',
    dose: '',
    duree: '',
  };
  medicaments: any[] = []; // List of associated medications

  private apiUrl = 'https://your-api-url.com/api'; // Replace with your backend URL

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Retrieve the consultation ID
    this.consultationId =
      this.route.snapshot.paramMap.get('consultationId') ||
      localStorage.getItem('currentConsultationId');

    if (!this.consultationId) {
      console.error('Consultation ID not found.');
    }
  }

  addMedicament(): void {
    // Add the medication even if all fields are not filled
    this.medicaments.push({ ...this.formData });

    // Reset the form after adding
    this.formData = { nom: '', dose: '', duree: '' };
  }

  saveOrdonnance(): void {
    if (!this.consultationId) {
      console.error('Consultation ID is required to create an ordonnance.');
      return;
    }

    const ordonnanceData = {
      consultationId: this.consultationId,
      medicaments: this.medicaments, // Can be empty
    };

    // Save medicaments to localStorage
    localStorage.setItem('savedMedicaments', JSON.stringify(this.medicaments));
    console.log('Ordonnance data saved to localStorage:', this.medicaments);

    // Save the ordonnance as a JSON file
    this.saveAsJsonFile(ordonnanceData);

    // Send the request to the backend
    this.http.post(`${this.apiUrl}/ordonnances`, ordonnanceData).subscribe({
      next: (response) => {
        console.log('Ordonnance saved successfully:', response);

        // Clear local data
        this.medicaments = [];
        this.formData = { nom: '', dose: '', duree: '' };

        // Navigate to the next page (e.g., diagnostic)
        this.router.navigate(['/diagnostic', this.consultationId]);
      },
      error: (error) => {
        console.error('Error saving ordonnance:', error);
      },
    });
  }

  saveAsJsonFile(data: any): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const fileName = `ordonnance-${this.consultationId}.json`;
    saveAs(blob, fileName);
    console.log('Ordonnance saved as JSON file:', fileName);
  }

  goToOrdonnance(): void {
    const savedOrdonnance = localStorage.getItem('lastOrdonnance');
    if (savedOrdonnance) {
      const ordonnanceData = JSON.parse(savedOrdonnance);
      console.log('Last ordonnance:', ordonnanceData);

      // Navigate to another page to display the ordonnance
      this.router.navigate(['/ordonnanceTem'], {
        state: { data: ordonnanceData },
      });
    } else {
      console.log('No saved ordonnance to display.');
    }
  }
}
