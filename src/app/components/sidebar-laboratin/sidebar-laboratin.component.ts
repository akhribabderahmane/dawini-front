import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-laboratin',
  templateUrl: './sidebar-laboratin.component.html',
  styleUrls: ['./sidebar-laboratin.component.css']
})
export class SidebarLaboratinComponent {
    constructor(private router: Router) {}
  
    // Method to navigate to different routes
    navigateTo(route: string) {
      this.router.navigate([`/${route}`]); // Navigate to the specified route
    }
   
    // Method to handle logout
    onLogout() {
      localStorage.clear(); // Clear local storage
      this.router.navigate(['/login']); // Redirect to login page
    }
}