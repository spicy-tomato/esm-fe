import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaidInvigilatorDepartmentComponent } from './invigilator-department.component';

const routes: Routes = [
  {
    path: '',
    component: PaidInvigilatorDepartmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaidInvigilatorDepartmentRoutingModule {}
