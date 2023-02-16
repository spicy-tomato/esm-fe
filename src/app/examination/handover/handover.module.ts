import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExaminationHandoverComponent } from './handover.component';
import { ExaminationHandoverRoutingModule } from './handover.routing';

@NgModule({
  imports: [CommonModule, ExaminationHandoverRoutingModule],
  declarations: [ExaminationHandoverComponent],
  exports: [ExaminationHandoverComponent],
})
export class ExaminationHandoverModule {}
