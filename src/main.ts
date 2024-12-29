import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import `provideHttpClient`
import { AppRoutingModule } from './app/app.routes';
import { CommonModule } from '@angular/common';  // Import CommonM

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),  // Enable `fetch` for HTTP requests
    AppRoutingModule,  // Your routing module
  ],
}).catch((err) => console.error(err));