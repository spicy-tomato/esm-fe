import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationGeneralComponent } from './general.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationGeneralComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminationGeneralRoutingModule {}
