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
  TuiDataListModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { InvigilatorAssignRoomComponent } from './assign-room.component';
import { AssignRoomRoutingModule } from './assign-room.routing';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiComboBoxModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSelectModule,
  TuiTableModule,
  TuiTextfieldControllerModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AssignRoomRoutingModule,
    ScrollingModule,
    ArrayPipeModule,
    ExamMethodPipeModule,
    VarModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [InvigilatorAssignRoomComponent],
  exports: [InvigilatorAssignRoomComponent],
})
export class InvigilatorAssignRoomModule {}
