import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExamMethodPipeModule } from '@esm/core';
import { ErrorFlagModule } from '@esm/shared/components';
import { VarModule } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiDataListModule,
  TuiDropdownModule,
  TuiScrollbarModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import {
  TuiDataListDropdownManagerModule,
  TuiInputNumberModule,
} from '@taiga-ui/kit';
import { ExaminationDataTableComponent } from './table.component';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiDataListModule,
  TuiDataListDropdownManagerModule,
  TuiDropdownModule,
  TuiInputNumberModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTableModule,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VarModule,
    ExamMethodPipeModule,
    ScrollingModule,
    ErrorFlagModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [ExaminationDataTableComponent],
  exports: [ExaminationDataTableComponent],
})
export class ExaminationDataTableModule {}
