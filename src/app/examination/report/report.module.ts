import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExaminationReportComponent } from './report.component';
import { ExaminationReportRoutingModule } from './report.routing';

@NgModule({
  imports: [CommonModule, ExaminationReportRoutingModule],
  declarations: [ExaminationReportComponent],
  exports: [ExaminationReportComponent],
})
export class ExaminationReportModule {}
