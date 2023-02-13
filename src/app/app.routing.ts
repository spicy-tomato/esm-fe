import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: async () =>
      (await import('./user/login/login.module')).LoginModule,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: async () =>
          (await import('./examination/overview/overview.module'))
            .OverviewModule,
      },
      {
        path: 'notification',
        loadChildren: async () =>
          (await import('./notification/notification.module'))
            .NotificationModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
