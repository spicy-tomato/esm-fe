import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { LetModule } from '@ngrx/component';

export const NGRX = [LetModule];

@NgModule({
  imports: [CommonModule, ...NGRX],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class LoaderModule {}
