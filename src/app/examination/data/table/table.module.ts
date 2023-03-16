import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExamMethodPipeModule } from '@esm/core';
import { VarModule } from '@esm/shared/directives';
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
import { ExaminationDataTableComponent } from './table.component';

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
    VarModule,
    ExamMethodPipeModule,
    ScrollingModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [ExaminationDataTableComponent],
  exports: [ExaminationDataTableComponent],
})
export class ExaminationDataTableModule {}
