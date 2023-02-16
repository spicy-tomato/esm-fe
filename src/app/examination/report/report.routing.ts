import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationReportComponent } from './report.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminationReportRoutingModule {}
