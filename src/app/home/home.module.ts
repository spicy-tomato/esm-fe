import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiActionModule } from '@taiga-ui/kit';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

export const NGRX = [LetModule];
export const TAIGA_UI = [TuiActionModule, TuiLinkModule];

@NgModule({
  imports: [CommonModule, HomeRoutingModule, ...NGRX, ...TAIGA_UI],
  declarations: [HomeComponent],
})
export class HomeModule {}
