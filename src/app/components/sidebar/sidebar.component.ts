import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
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
