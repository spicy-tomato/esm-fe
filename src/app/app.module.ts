import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { duplicatedFactory, emailFactory, requiredFactory } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import { AuthInterceptor } from '@esm/interceptors';
import { AppEffects, appFeatureKey, appReducer } from '@esm/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TUI_IS_CYPRESS } from '@taiga-ui/cdk';
import {
  TUI_ANIMATIONS_DURATION,
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { TUI_LANGUAGE, TUI_VIETNAMESE_LANGUAGE } from '@taiga-ui/i18n';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LoaderComponent } from './shared/components';

const NGRX = [
  StoreModule.forRoot({ router: routerReducer }, {}),
  StoreModule.forFeature(appFeatureKey, appReducer),
  EffectsModule.forRoot([AppEffects]),
  StoreDevtoolsModule.instrument({
    maxAge: 50,
  }),
  StoreRouterConnectingModule.forRoot(),
];
const TAIGA_UI = [TuiRootModule, TuiAlertModule, TuiDialogModule];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoaderComponent,
    ...NGRX,
    ...TAIGA_UI,
    AppRoutingModule,
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useFactory: (): { siteKey: string } => inject(APP_ENV).recaptcha,
    },
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_VIETNAMESE_LANGUAGE),
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: requiredFactory,
        email: emailFactory,
        duplicated: duplicatedFactory,
      },
    },
    {
      provide: TUI_ANIMATIONS_DURATION,
      useFactory: (): number => (inject(TUI_IS_CYPRESS) ? 0 : 300),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
