import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputDateRangeModule,
  TuiInputModule,
  TuiIslandModule,
} from '@taiga-ui/kit';
import { ExaminationCreateComponent } from './create.component';
import { ExaminationCreateRoutingModule } from './create.routing';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiInputDateRangeModule,
  TuiInputModule,
  TuiIslandModule,
  TuiLabelModule,
  TuiTextfieldControllerModule,
];

@NgModule({
  imports: [
    CommonModule,
    ExaminationCreateRoutingModule,
    ReactiveFormsModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [ExaminationCreateComponent],
  exports: [ExaminationCreateComponent],
})
export class CreateModule {}
