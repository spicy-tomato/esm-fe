import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data.component';
import { DataWrapperComponent } from './shared/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DataComponent,
  },
  {
    path: '',
    loadChildren: async () =>
      (await import('./shared/wrapper/wrapper.module')).DataWrapperModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataRoutingModule {}
