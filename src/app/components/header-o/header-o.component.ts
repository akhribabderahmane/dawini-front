import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-o',
  imports: [],
  templateUrl: './header-o.component.html',
  styleUrl: './header-o.component.css'
})
export class HeaderOComponent implements OnInit {
  selectedDate: string | null = null;

  ngOnInit(): void {
    // Retrieve the date from localStorage
    this.selectedDate = localStorage.getItem('selectedConsultationDate');
  }
}