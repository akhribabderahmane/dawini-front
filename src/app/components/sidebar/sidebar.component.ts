import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule],  // Add CommonModule here
})
export class SidebarComponent {
  constructor(private router: Router) {}

  // Method to check if the current route matches the given route
  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
