import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';  // Import `withFetch`
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app.routes';



bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),  // Enable `fetch` for HTTP requests
    AppRoutingModule,  // Your routing module
  ],
}).catch((err) => console.error(err));




