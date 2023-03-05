import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditInvigilatorDialogModule } from '@esm/shared/dialogs';
import { VarModule } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiFilterPipeModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiLoaderModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { DataInvigilatorComponent } from './invigilator.component';
import { DataInvigilatorRoutingModule } from './invigilator.routing';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiFilterPipeModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSelectModule,
  TuiTableModule,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DataInvigilatorRoutingModule,
    EditInvigilatorDialogModule,
    ScrollingModule,
    VarModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [DataInvigilatorComponent],
})
export class DataInvigilatorModule {}
