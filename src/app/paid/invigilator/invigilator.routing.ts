import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaidInvigilatorComponent } from './invigilator.component';

const routes: Routes = [
  {
    path: '',
    component: PaidInvigilatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaidInvigilatorRoutingModule {}
