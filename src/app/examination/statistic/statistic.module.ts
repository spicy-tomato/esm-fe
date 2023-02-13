import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticRoutingModule } from './statistic.routing';
import { StatisticComponent } from './statistic.component';
import { TuiIslandModule, TuiProgressModule } from '@taiga-ui/kit';

export const TAIGA_UI = [TuiIslandModule, TuiProgressModule];

@NgModule({
  imports: [CommonModule, StatisticRoutingModule, ...TAIGA_UI],
  declarations: [StatisticComponent],
})
export class StatisticModule {}
