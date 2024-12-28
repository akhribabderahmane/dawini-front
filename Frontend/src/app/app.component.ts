import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { FilterPipe } from './filter.pipe'; // Import the custom filter pipe
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LoginComponent } from "./components/patient-Data/patient-Data.component"; // Import CommonModule for ngFor


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, // Required for routing
    FormsModule, // Required for ngModel
    CommonModule,
    SidebarComponent,
    LoginComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Frontend';

  // Define properties for the app
  searchQuery: string = '';
  patients = [
    { name: 'John Doe', age: 30, gender: 'Male', nss: '12345', phone: '555-1234', email: 'john@example.com', picture: 'maria.jpg' },
    { name: 'Jane Smith', age: 25, gender: 'Female', nss: '12346', phone: '555-5678', email: 'jane@example.com', picture: 'aicha.jpg' }
    // Add more patient data as needed
  ];
}
