import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvigilatorAssignTeacherComponent } from './assign-teacher.component';

const routes: Routes = [
  {
    path: '',
    component: InvigilatorAssignTeacherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignTeacherRoutingModule {}
