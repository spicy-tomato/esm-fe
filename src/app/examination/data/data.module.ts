import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExaminationDataComponent } from './data.component';
import { ExaminationDataRoutingModule } from './data.routing';

@NgModule({
  imports: [CommonModule, ExaminationDataRoutingModule],
  declarations: [ExaminationDataComponent],
  exports: [ExaminationDataComponent],
})
export class ExaminationDataModule {}
