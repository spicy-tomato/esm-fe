import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationDataComponent } from './data.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminationDataRoutingModule {}
