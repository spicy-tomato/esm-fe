import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RelativeTimePipeModule } from '@esm/core';
import { LetModule } from '@ngrx/component';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import {
  TuiLineClampModule,
  TuiMarkerIconModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { NotificationListComponent } from './notification-list.component';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiActiveZoneModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiHintModule,
  TuiLineClampModule,
  TuiMarkerIconModule,
  TuiSvgModule,
  TuiTabsModule,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RelativeTimePipeModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [NotificationListComponent],
  exports: [NotificationListComponent],
})
export class NotificationListModule {}
