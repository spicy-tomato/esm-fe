import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewRoutingModule } from './overview.routing';
import { OverviewComponent } from './overview.component';
import { TuiIslandModule, TuiProgressModule } from '@taiga-ui/kit';

export const TAIGA_UI = [TuiIslandModule, TuiProgressModule];

@NgModule({
  imports: [CommonModule, OverviewRoutingModule, ...TAIGA_UI],
  declarations: [OverviewComponent],
})
export class OverviewModule {}
