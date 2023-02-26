import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditFacultyDialogModule } from '@esm/shared/dialogs';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiButtonModule,
  TuiHintModule,
  TuiLinkModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { DataFacultyComponent } from './faculty.component';
import { DataFacultyRoutingModule } from './faculty.routing';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiHintModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiTableModule,
];

@NgModule({
  imports: [
    CommonModule,
    EditFacultyDialogModule,
    DataFacultyRoutingModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [DataFacultyComponent],
})
export class DataFacultyModule {}
