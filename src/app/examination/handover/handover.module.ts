import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExamMethodPipeModule } from '@esm/core';
import { EditShiftReportModule } from '@esm/shared/dialogs';
import { VarModule } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { ExaminationHandoverComponent } from './handover.component';
import { ExaminationHandoverRoutingModule } from './handover.routing';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSelectModule,
  TuiTableModule,
  TuiTextfieldControllerModule,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VarModule,
    ExamMethodPipeModule,
    ScrollingModule,
    EditShiftReportModule,
    ...NGRX,
    ...TAIGA_UI,
    ExaminationHandoverRoutingModule,
  ],
  declarations: [ExaminationHandoverComponent],
  exports: [ExaminationHandoverComponent],
})
export class ExaminationHandoverModule {}
