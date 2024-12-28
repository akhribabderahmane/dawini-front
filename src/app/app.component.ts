import { Component } from '@angular/core';
import { HomeComponent } from './Pages/home/home.component';
import { AppointmentsComponent } from './Pages/appointments/appointments.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Frontend';
}