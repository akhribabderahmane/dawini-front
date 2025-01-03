import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { error } from 'console';
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

  get role(){
    return this.loginForm.get('role');
  }

  // Handle form submission
  onSubmit() {
    this.submitted = true;
  
    if (this.loginForm.invalid) {
      return;
    }
  
    const { username, password, role } = this.loginForm.value;

    // Appeler le service de connexion avec les trois arguments
    this.userService.login(username, password, role).subscribe(
      (response: any) => {
        console.log('Login successful:', response);

        // Save token and role in localStorage
        localStorage.setItem('token', response.id);
        localStorage.setItem('role', response.user.role);

        // Redirect based on role
        this.redirectToRolePage(response.user.role, response.id);
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
    case 'infermier':
    case 'radiologue':
    case 'laboratin':
      // Tous ces rôles vont à la liste des patients
      this.router.navigate(['/patientlist']);
      break;
    case 'medecin':
      // Rediriger vers le profil du médecin avec les données nécessaires
      this.userService.fetchMedecinData(userId).subscribe(
        (data) => {
          console.log('Medecin data:', data);
          this.router.navigate(['/doctor-profile'], { state: { data } });
        },
        (error) => console.error('Error fetching medecin data:', error)
      );
      break;

      case 'patient': 
        this.userService.getPatientDetails(userId.toString()).subscribe(
          (data) => {
            console.log("patients data: ", data);
            this.router.navigate([`/profile/${data.id}`], { state: { data } });
          },
          (error) => console.error('Error fetching patients data:', error)
        );
        break;
    default:
      console.error('Unknown role:', role);
      alert('Unknown role. Please contact support.');
  }
}

}
