import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArrayPipeModule, ExamMethodPipeModule } from '@esm/core';
import { VarModule } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { InvigilatorAssignFacultyComponent } from './assign-faculty.component';
import { AssignFacultyRoutingModule } from './assign-faculty.routing';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiInputNumberModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiTableModule,
  TuiTooltipModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AssignFacultyRoutingModule,
    ScrollingModule,
    ArrayPipeModule,
    ExamMethodPipeModule,
    VarModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [InvigilatorAssignFacultyComponent],
  exports: [InvigilatorAssignFacultyComponent],
})
export class InvigilatorAssignFacultyModule {}
