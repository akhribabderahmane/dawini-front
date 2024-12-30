import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService // Inject the service
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getters for easy access to form fields
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Handle form submission
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    // Perform login
    this.userService.login(username, password).subscribe(
      (response: any) => {
        console.log('Login successful:', response);

        // Save token and role in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.user.role);

        // Redirect based on role
        this.redirectToRolePage(response.user.role, response.user.id);
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }

  // Redirect user based on their role
  private redirectToRolePage(role: string, userId: number) {
    switch (role) {
      case 'admin':
        this.userService.fetchAdminData().subscribe(
          (data) => {
            console.log('Admin data:', data);
            this.router.navigate(['/admin'], { state: { data } });
          },
          (error) => console.error('Error fetching admin data:', error)
        );
        break;
      case 'medecin':
        this.userService.fetchMedecinData(userId).subscribe(
          (data) => {
            console.log('Medecin data:', data);
            this.router.navigate(['/medecin'], { state: { data } });
          },
          (error) => console.error('Error fetching medecin data:', error)
        );
        break;
        case 'patient':
        this.userService.getPatientDetails(userId).subscribe(
          (data) => {
            console.log('patient data:', data);
            this.router.navigate(['/home'], { state: { data } });
          },
          (error) => console.error('Error fetching medecin data:', error)
        );
        break;
      case 'pharmacie':
        this.userService.fetchPharmacieData(userId).subscribe(
          (data) => {
            console.log('Pharmacie data:', data);
            this.router.navigate(['/pharmacie'], { state: { data } });
          },
          (error) => console.error('Error fetching pharmacie data:', error)
        );
        break;
      case 'infermier':
      case 'laboratin':
      case 'radiologue':
        this.userService.fetchPatientsData().subscribe(
          (data) => {
            console.log('Patients data:', data);
            this.router.navigate(['/patientslist'], { state: { data } });
          },
          (error) => console.error('Error fetching patients data:', error)
        );
        break;
      default:
        console.error('Unknown role:', role);
        alert('Unknown role. Please contact support.');
    }
  }
  handleRedirect(role: string) {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from storage

  if (!userId) {
    console.error('User ID is not set. Please log in first.');
    alert('Please log in before accessing this page.');
    return;
  }

  // Convert userId to a number
  const numericUserId = Number(userId);

  if (isNaN(numericUserId)) {
    console.error('User ID is invalid.');
    alert('Invalid User ID. Please log in again.');
    return;
  }

  // Redirect to the appropriate page
  this.redirectToRolePage(role, numericUserId);
}
  
}
