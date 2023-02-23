import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiSelectModule } from '@taiga-ui/kit';
import { EditDepartmentDialogComponent } from './edit-department.component';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiLabelModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ...NGRX, ...TAIGA_UI],
  declarations: [EditDepartmentDialogComponent],
  exports: [EditDepartmentDialogComponent],
})
export class EditDepartmentDialogModule {}
