import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationCreateComponent } from './create.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminationCreateRoutingModule {}
