<<<<<<< HEAD
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
=======
import { ApplicationConfig } from '@angular/core';
>>>>>>> 8fa98216bb59fba37d8a5c1aca606cf55031f6fc
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
<<<<<<< HEAD
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
}; 
=======
    provideRouter(routes),
    provideHttpClient()
  ]
};
>>>>>>> 8fa98216bb59fba37d8a5c1aca606cf55031f6fc
