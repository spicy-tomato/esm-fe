import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataWrapperComponent } from './wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: DataWrapperComponent,
    children: [
      {
        path: 'faculty',
        loadChildren: async () =>
          (await import('../../faculty/faculty.module')).DataFacultyModule,
      },
      {
        path: 'department',
        loadChildren: async () =>
          (await import('../../department/department.module'))
            .DataDepartmentModule,
      },
      {
        path: 'invigilator',
        loadChildren: async () =>
          (await import('../../invigilator/invigilator.module'))
            .DataInvigilatorModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataWrapperRoutingModule {}
