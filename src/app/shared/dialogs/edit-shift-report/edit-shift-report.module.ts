import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExamMethodPipeModule } from '@esm/core';
import { LetModule } from '@ngrx/component';
import { TuiEditorModule } from '@taiga-ui/addon-editor';
import {
  TuiButtonModule,
  TuiLabelModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { EditShiftReportComponent } from './edit-shift-report.component';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiInputModule,
  TuiLabelModule,
  TuiEditorModule,
  TuiTextfieldControllerModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ExamMethodPipeModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [EditShiftReportComponent],
  exports: [EditShiftReportComponent],
})
export class EditShiftReportModule {}
