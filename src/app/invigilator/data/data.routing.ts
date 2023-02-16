import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvigilatorDataComponent } from './data.component';

const routes: Routes = [
  {
    path: '',
    component: InvigilatorDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvigilatorDataRoutingModule {}
