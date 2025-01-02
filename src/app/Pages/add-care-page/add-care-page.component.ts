import { Component } from '@angular/core';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { SidebarInfComponent } from '../../components/sidebar-inf/sidebar-inf.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
@Component({
  selector: 'app-add-care-page',
  imports: [ HeaderProfileComponent, SidebarInfComponent,FormFieldComponent],
  templateUrl: './add-care-page.component.html',
  styleUrl: './add-care-page.component.css'
})
export class AddCarePageComponent {

}
