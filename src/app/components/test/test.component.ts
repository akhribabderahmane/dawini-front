import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import de CommonModule

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [HttpClientModule, CommonModule], // Ajoutez CommonModule ici
  template: `<div>{{ data | json }}</div>`,
})
export class TestComponent {
  data: any;

  constructor(private http: HttpClient) {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe((res) => {
      this.data = res;
    });
  }
}
