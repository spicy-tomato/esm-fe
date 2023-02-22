import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataInvigilatorComponent } from './invigilator.component';

const routes: Routes = [
  {
    path: '',
    component: DataInvigilatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataInvigilatorRoutingModule {}
