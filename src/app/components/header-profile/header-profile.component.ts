import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.css'],
})
export class HeaderProfileComponent implements OnInit {
  userName: string = '';
  userRole: string = '';

  ngOnInit() {
    // Retrieve user info from local storage
    const nom = localStorage.getItem('nom') || 'Unknown';
    const prenom = localStorage.getItem('prenom') || 'User';
    const role = localStorage.getItem('role') || 'Guest';

    // Set the displayed values
    this.userName = `${prenom} ${nom}`;
    this.userRole = role;
  }
}
