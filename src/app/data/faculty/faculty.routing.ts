import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataFacultyComponent } from './faculty.component';

const routes: Routes = [
  {
    path: '',
    component: DataFacultyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataFacultyRoutingModule {}
