import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationHandoverComponent } from './handover.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationHandoverComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminationHandoverRoutingModule {}
