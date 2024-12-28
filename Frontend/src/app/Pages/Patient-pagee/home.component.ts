import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for Angular features
import { FormsModule } from '@angular/forms';  // Import FormsModule for form handling
import { SidebarComponent } from "../../components/sidebar/sidebar.component";  // Import Sidebar component
import { LoginComponent } from "../../components/patient-Data/patient-Data.component";  // Import Login component

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    LoginComponent,
    // No need for HttpClientModule or HttpClient here anymore
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  // You can still keep the method signature, but no need for HTTP requests
  // If you want to populate patients manually, do it here
}
