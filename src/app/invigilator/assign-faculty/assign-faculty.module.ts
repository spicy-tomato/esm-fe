import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiButtonModule, TuiScrollbarModule } from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { AssignFacultyRoutingModule } from './assign-faculty.routing';
import { InvigilatorAssignFacultyComponent } from './assign-faculty.component';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiInputNumberModule,
  TuiScrollbarModule,
  TuiTableModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AssignFacultyRoutingModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [InvigilatorAssignFacultyComponent],
  exports: [InvigilatorAssignFacultyComponent],
})
export class InvigilatorAssignFacultyModule {}
