import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiHostedDropdownModule } from '@taiga-ui/core';
import { TuiBadgedContentModule } from '@taiga-ui/kit';
import { NotificationListModule } from '../notification-list/notification-list.module';
import { BellComponent } from './bell.component';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiActiveZoneModule,
  TuiBadgedContentModule,
  TuiButtonModule,
  TuiHostedDropdownModule,
];

@NgModule({
  imports: [CommonModule, NotificationListModule, ...NGRX, ...TAIGA_UI],
  declarations: [BellComponent],
  exports: [BellComponent],
})
export class BellModule {}
