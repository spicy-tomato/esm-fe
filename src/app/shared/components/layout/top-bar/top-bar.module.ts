import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VarModule } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiPrimitiveTextfieldModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { BellModule } from '../../bell';
import { TopBarComponent } from './top-bar.component';

const NGRX = [LetModule];
export const TAIGA_UI = [
  // TuiSidebarModule,
  TuiActiveZoneModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiInputModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BellModule,
    VarModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [TopBarComponent],
  exports: [TopBarComponent],
})
export class TopBarModule {}
