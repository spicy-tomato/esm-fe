import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TUI_IS_CYPRESS } from '@taiga-ui/cdk';
import {
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
  TUI_ANIMATIONS_DURATION,
} from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { AuthInterceptor } from 'src/app/utils/interceptors/auth.interceptor';
import { AppEffects, appFeatureKey, appReducer } from 'src/app/utils/store';
import { emailFactory, requiredFactory } from 'src/cdk/factories';
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
      provide: TUI_ANIMATIONS_DURATION,
      useFactory: (): number => (inject(TUI_IS_CYPRESS) ? 0 : 300),
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: requiredFactory,
        email: emailFactory,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
