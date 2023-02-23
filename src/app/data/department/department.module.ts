import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditDepartmentDialogModule } from '@esm/shared/dialogs';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiFilterPipeModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { DataDepartmentComponent } from './department.component';
import { DataDepartmentRoutingModule } from './department.routing';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiFilterPipeModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiLoaderModule,
  TuiSelectModule,
  TuiTableModule,
  TuiTextfieldControllerModule,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    EditDepartmentDialogModule,
    DataDepartmentRoutingModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [DataDepartmentComponent],
})
export class DataDepartmentModule {}
