import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { emailFactory, requiredFactory } from '@esm/cdk';
import { AuthInterceptor } from '@esm/interceptors';
import { AppEffects, appFeatureKey, appReducer } from '@esm/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TUI_IS_CYPRESS } from '@taiga-ui/cdk';
import {
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
  TUI_ANIMATIONS_DURATION,
  TUI_SANITIZER
} from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

const NGRX = [
  StoreModule.forRoot({}, {}),
  StoreModule.forFeature(appFeatureKey, appReducer),
  EffectsModule.forRoot([AppEffects]),
  StoreDevtoolsModule.instrument({
    maxAge: 50,
  }),
];
const TAIGA_UI = [TuiRootModule, TuiAlertModule, TuiDialogModule];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: requiredFactory,
        email: emailFactory,
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
