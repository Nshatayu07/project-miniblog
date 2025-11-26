import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideMarkdown } from 'ngx-markdown';
import { provideState, provideStore } from '@ngrx/store';
import { blogpostFeature, categoryFeature } from './appStore/app-store';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideMarkdown(),
    provideStore(),
    provideState(blogpostFeature.name, blogpostFeature.reducer),
    provideState(categoryFeature.name, categoryFeature.reducer),
    provideEffects(
      blogpostFeature.effects,
      categoryFeature.effects
    ),
  ]
};
  