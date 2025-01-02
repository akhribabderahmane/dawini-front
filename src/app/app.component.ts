import { Component } from '@angular/core';
import { NewPatientComponent } from './components/new-patient/new-patient.component';
//import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
//import { ModifyPatientComponent } from './Pages/modify-patient/modify-patient.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  //imports :[ModifyPatientComponent  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Frontend';
}
