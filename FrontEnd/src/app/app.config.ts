import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { MaterialModule } from './shared/material/material.module';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
   
    provideRouter(appRoutes),

    provideHttpClient(),                             
   
    provideAnimations(),                             
    importProvidersFrom(BrowserAnimationsModule, MaterialModule)
  ]
};
