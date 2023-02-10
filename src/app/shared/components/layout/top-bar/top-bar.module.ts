import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { BellModule } from '../../bell';
import { TopBarComponent } from './top-bar.component';

const NGRX = [LetModule];
const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
  // TuiSidebarModule,
  TuiActiveZoneModule,
];

@NgModule({
  imports: [CommonModule, RouterModule, BellModule, ...NGRX, ...TAIGA_UI],
  declarations: [TopBarComponent],
  exports: [TopBarComponent],
})
export class TopBarModule {}
