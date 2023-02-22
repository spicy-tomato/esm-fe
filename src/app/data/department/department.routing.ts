import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataDepartmentComponent } from './department.component';

const routes: Routes = [
  {
    path: '',
    component: DataDepartmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataDepartmentRoutingModule {}
