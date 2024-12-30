import { Component } from '@angular/core';
import { DataViewComponent } from "../../components/data-view/data-view.component";
import { ObservationComponent } from "../../components/observation/observation.component";
import { HeaderLaboratinComponent } from "../../components/header-laboratin/header-laboratin.component";
import { SidebarLaboratinComponent } from "../../components/sidebar-laboratin/sidebar-laboratin.component";

@Component({
  selector: 'app-page2',
  imports: [DataViewComponent, ObservationComponent, HeaderLaboratinComponent, SidebarLaboratinComponent],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.css'
})
export class Page2Component {

}
