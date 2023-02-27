import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExamMethodPipeModule } from '@esm/core';
import { ErrorFlagModule } from '@esm/shared/components';
import {
  AddModuleDialogModule,
  AddRoomDialogModule,
} from '@esm/shared/dialogs';
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
import { ExaminationDataTemporaryTableComponent } from './temporary-table.component';

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
    ErrorFlagModule,
    AddModuleDialogModule,
    AddRoomDialogModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [ExaminationDataTemporaryTableComponent],
  exports: [ExaminationDataTemporaryTableComponent],
})
export class ExaminationDataTemporaryTableModule {}
