import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // For common directives like ngIf, ngFor, etc.
import { HttpClientModule } from '@angular/common/http';  // For making HTTP requests
import { RouterModule } from '@angular/router';  // To enable routing functionality

@Component({
  selector: 'app-root',
  standalone: true,  // Indicate that this is a standalone component
  imports: [
    RouterOutlet,     // For routing outlet
    FormsModule,      // For forms handling
    CommonModule,     // For common Angular directives (ngIf, ngFor, etc.)
    HttpClientModule, // For making HTTP requests
    RouterModule      // For routing functionality
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected typo from "styleUrl" to "styleUrls"
})
export class AppComponent {
  title = 'inf'; // Application title
}
