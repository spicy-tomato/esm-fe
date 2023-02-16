import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationDocumentComponent } from './document.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationDocumentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminationDocumentRoutingModule {}
