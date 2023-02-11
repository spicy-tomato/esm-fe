import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { MainViewComponent } from './main-view.component';

const NGRX = [LetModule];
export const TAIGA_UI = [TuiScrollbarModule];

@NgModule({
  imports: [CommonModule, RouterModule, ...NGRX, TAIGA_UI],
  declarations: [MainViewComponent],
  exports: [MainViewComponent],
})
export class MainViewModule {}
