import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExaminationGeneralComponent } from './general.component';
import { ExaminationGeneralRoutingModule } from './general.routing';

@NgModule({
  declarations: [ExaminationGeneralComponent],
  imports: [CommonModule, ExaminationGeneralRoutingModule],
  exports: [ExaminationGeneralComponent],
})
export class ExaminationGeneralModule {}
