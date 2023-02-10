import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'demo',
    loadChildren: async () => (await import('../demo/demo.module')).DemoModule,
  },
  {
    path: 'login',
    loadChildren: async () =>
      (await import('./user/login/login.module')).LoginModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
