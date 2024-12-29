import { Component } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LoginComponent } from '../../components/login/login.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DoctorsComponent } from '../../components/doctors/doctors.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    AboutComponent,
    LoginComponent,
    FooterComponent,
    DoctorsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
