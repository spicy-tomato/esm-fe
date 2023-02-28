import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaminationDataTemporaryTableComponent } from './table.component';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { ExamMethodPipeModule } from '@esm/core';
import { VarModule } from '@esm/shared/directives';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiInputNumberModule,
  TuiLoaderModule,
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
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [ExaminationDataTemporaryTableComponent],
  exports: [ExaminationDataTemporaryTableComponent],
})
export class ExaminationDataTableModule {}
