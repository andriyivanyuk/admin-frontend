import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthService } from './services/auth.service';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TokenStorageService } from './services/token-storage.service';
import { AuthGuard } from './guards/auth.guard';
import { CategoryService } from './services/category.service';
import { ProductStatusService } from './services/status.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthService,
    CategoryService,
    ProductStatusService,
    TokenStorageService,
    AuthGuard,
  ],
};
