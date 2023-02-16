import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaidExamDepartmentComponent } from './exam-department.component';

const routes: Routes = [
  {
    path: '',
    component: PaidExamDepartmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaidExamDepartmentRoutingModule {}
