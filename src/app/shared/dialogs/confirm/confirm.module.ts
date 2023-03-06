import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { ConfirmDialogComponent } from './confirm.component';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiSvgModule,
  // TuiDataListModule,
  // TuiFilterPipeModule,
  // TuiInputModule,
  // TuiLabelModule,
  // TuiSelectModule,
  // TuiTextfieldControllerModule,
];

@NgModule({
  imports: [CommonModule, ...NGRX, ...TAIGA_UI],
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
})
export class ConfirmDialogModule {}
