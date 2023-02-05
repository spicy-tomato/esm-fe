import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TUI_IS_CYPRESS } from '@taiga-ui/cdk';
import {
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
  TUI_ANIMATIONS_DURATION,
} from '@taiga-ui/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const TAIGA_UI = [TuiRootModule, TuiAlertModule, TuiDialogModule];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ...TAIGA_UI,
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: TUI_ANIMATIONS_DURATION,
      useFactory: () => (inject(TUI_IS_CYPRESS) ? 0 : 300),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
