import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamMethodPipeModule } from '@esm/core';
import { VarModule } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { ExaminationExamComponent } from './exam.component';
import { ExaminationExamRoutingModule } from './exam.routing';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiInputNumberModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiTableModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExaminationExamRoutingModule,
    ExamMethodPipeModule,
    ScrollingModule,
    VarModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [ExaminationExamComponent],
  exports: [ExaminationExamComponent],
})
export class ExaminationExamModule {}
