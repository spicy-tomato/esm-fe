import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvigilatorAssignFacultyComponent } from './assign-faculty.component';

const routes: Routes = [
  {
    path: '',
    component: InvigilatorAssignFacultyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignFacultyRoutingModule {}
