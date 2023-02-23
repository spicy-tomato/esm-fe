import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditDepartmentDialogModule } from '@esm/shared/dialogs';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { DataDepartmentComponent } from './department.component';
import { DataDepartmentRoutingModule } from './department.routing';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiLoaderModule,
  TuiTableModule,
];

@NgModule({
  imports: [
    CommonModule,
    EditDepartmentDialogModule,
    DataDepartmentRoutingModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [DataDepartmentComponent],
})
export class DataDepartmentModule {}
