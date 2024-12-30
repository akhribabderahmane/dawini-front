
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar1',
  imports: [],
  templateUrl: './sidebar1.component.html',
  styleUrl: './sidebar1.component.css'
})
export class Sidebar1Component {
  constructor(private router: Router) {}

  // Method to navigate to different routes
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]); // Navigate to the specified route
  }
  navigateToOO(route: string, id: string): void {
    this.router.navigate([`${route}/${id}`]);
  }
  // Method to handle logout
  onLogout() {
    localStorage.clear(); // Clear local storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
