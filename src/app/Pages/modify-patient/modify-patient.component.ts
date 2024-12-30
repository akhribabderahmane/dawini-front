
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Sidebar1Component } from "../../components/sidebar1/sidebar1.component";
import { FormsModule } from '@angular/forms'; // Import FormsModule
@Component({
  selector: 'app-modify-patient',
  templateUrl: './modify-patient.component.html',
  styleUrls: ['./modify-patient.component.css'],
  imports: [Sidebar1Component,FormsModule],
})
export class ModifyPatientComponent implements OnInit {
  patientDetails: any = {
    nom: '',
    nss: '',
    age: null,
    addresse: '',
    email: '',
    telephone: '',
    gender: '',
    personne_contact: '',
    image: '',
  };
  originalDetails: any = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.userService.getPatientDetails(Number(patientId)).subscribe(
        (data) => {
          this.patientDetails = data;
          this.originalDetails = { ...data }; // Keep a copy for discard
        },
        (error) => {
          console.error('Error fetching patient details:', error);
        }
      );
    }
  }

  savePatientDetails(): void {
    this.userService.updatePatientDetails(this.patientDetails).subscribe(
      () => {
        alert('Patient information saved successfully.');
        this.router.navigate(['/patientinfo', this.patientDetails.id]);
      },
      (error) => {
        console.error('Error saving patient details:', error);
        alert('An error occurred while saving. Please try again.');
      }
    );
  }

  discardChanges(): void {
    this.patientDetails = { ...this.originalDetails }; // Revert to original
    alert('Changes discarded.');
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.patientDetails.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
