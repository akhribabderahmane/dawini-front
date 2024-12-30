import { Component } from '@angular/core';
import { SidebarRadiologueComponent } from "../../components/sidebar-radiologue/sidebar-radiologue.component";
import { HeaderRadiologueComponent } from "../../components/header-radiologue/header-radiologue.component";
import { DataPageComponent } from "../../components/data-page/data-page.component";
import { ObservationRadiologueComponent } from "../../components/observation-radiologue/observation-radiologue.component";
import { AppointmentstableComponent } from "../../components/appointments-table/appointments-table.component";

@Component({
  selector: 'app-page2-radiologue',
  imports: [HeaderRadiologueComponent, AppointmentstableComponent , SidebarRadiologueComponent, DataPageComponent, ObservationRadiologueComponent],
  templateUrl: './page2-radiologue.component.html',
  styleUrl: './page2-radiologue.component.css'
})
export class Page2RadiologueComponent {
  userRole: string | null = null; // User role (patient or radiologist)
  activeTab: string = 'images'; // Default to 'appointments'
  selectTab(tab: string): void {
    this.activeTab = tab;
  }
}
