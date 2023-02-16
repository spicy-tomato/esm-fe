import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaminationProcessRoutingModule } from './process.routing';
import { ExaminationProcessComponent } from './process.component';
import { TuiIslandModule, TuiProgressModule } from '@taiga-ui/kit';

export const TAIGA_UI = [TuiIslandModule, TuiProgressModule];

@NgModule({
  imports: [CommonModule, ExaminationProcessRoutingModule, ...TAIGA_UI],
  declarations: [ExaminationProcessComponent],
})
export class ExaminationProcessModule {}
