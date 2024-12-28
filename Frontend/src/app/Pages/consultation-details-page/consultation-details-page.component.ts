import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import {  HeaderComponent } from "../../components/header/header.component";
import { ConsultationDetailsComponent } from "../../components/consultation-details/consultation-details.component";

@Component({
  selector: 'app-consultation-details-page',
  imports: [SidebarComponent, HeaderComponent, HeaderComponent, ConsultationDetailsComponent],
  templateUrl: './consultation-details-page.component.html',
  styleUrl: './consultation-details-page.component.css'
})
export class ConsultationDetailspage {

}
