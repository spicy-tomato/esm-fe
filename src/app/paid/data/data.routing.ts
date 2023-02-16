import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaidDataComponent } from './data.component';

const routes: Routes = [
  {
    path: '',
    component: PaidDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaidDataRoutingModule {}
