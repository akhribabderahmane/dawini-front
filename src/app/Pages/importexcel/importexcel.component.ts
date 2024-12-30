import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImportPageComponent } from "./../../components/import-page-component/import-page-component.component";
import { SidebarLaboratinComponent } from "./../../components/sidebar-laboratin/sidebar-laboratin.component";
import { HeaderLaboratinComponent } from "./../../components/header-laboratin/header-laboratin.component";
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
@Component({
  selector: 'app-root',
  imports: [  HeaderLaboratinComponent, SidebarLaboratinComponent, ImportPageComponent],
  templateUrl: './importexcel.component.html',
  styleUrl: './importexcel.component.css'
})
export class importexcelComponent {
  title = 'laboratin';
}