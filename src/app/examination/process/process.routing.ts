import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationProcessComponent } from './process.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationProcessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminationProcessRoutingModule { }
