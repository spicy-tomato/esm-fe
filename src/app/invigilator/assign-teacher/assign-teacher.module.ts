import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiRepeatTimesModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiScrollbarModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { InvigilatorAssignTeacherComponent } from './assign-teacher.component';
import { AssignTeacherRoutingModule } from './assign-teacher.routing';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListWrapperModule,
  TuiRepeatTimesModule,
  TuiScrollbarModule,
  TuiSelectModule,
  TuiTableModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AssignTeacherRoutingModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [InvigilatorAssignTeacherComponent],
  exports: [InvigilatorAssignTeacherComponent],
})
export class InvigilatorAssignTeacherModule {}
