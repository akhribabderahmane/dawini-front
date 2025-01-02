import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderOComponent } from '../../components/header-o/header-o.component';
import { FooterOComponent } from '../../components/footer-o/footer-o.component';
import { DoctorDetailsComponent } from '../../components/doctor-details/doctor-details.component';
import { PrescriptionTableComponent } from '../../components/prescription-table/prescription-table.component';
import { SignatureComponent } from '../../components/signature/signature.component';

@Component({
  selector: 'app-ordonnance-tem',
  standalone: true,
  imports: [
    HeaderOComponent,
    FooterOComponent,
    DoctorDetailsComponent,
    PrescriptionTableComponent,
    SignatureComponent,
  ],
  templateUrl: './ordonnance-tem.component.html',
  styleUrls: ['./ordonnance-tem.component.css'],
})
export class OrdonnanceTemComponent {
  data: any = {}; // To hold the received data

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if the platform is a browser
    if (isPlatformBrowser(this.platformId)) {
      const navigation = history.state;
      this.data = navigation?.data || {};
      console.log('Received Data:', this.data);
    }
  }
}
