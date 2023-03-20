import { importProvidersFrom, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '@esm/data';
import { AuthGuard, PermissionGuard } from '@esm/guards';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  NotificationEffects,
  notificationFeatureKey,
  notificationReducer,
} from './shared/components';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: async () =>
      (await import('./user/login/login.component')).LoginComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(notificationFeatureKey, notificationReducer),
        EffectsModule.forFeature([NotificationEffects])
      ),
    ],
    children: [
      {
        path: '',
        loadChildren: async () => (await import('./home/home.routing')).ROUTES,
      },
      {
        path: 'create',
        loadChildren: async () =>
          (await import('./examination/create/create.routing')).ROUTES,
      },
      {
        path: 'data',
        loadChildren: async () => (await import('./data/data.routing')).ROUTES,
      },
      {
        path: 'notification',
        loadChildren: async () =>
          (await import('./notification/notification.routing')).ROUTES,
      },
      {
        path: ':examinationId',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: async () =>
              (await import('./examination/general/general.routing')).ROUTES,
          },
          {
            path: 'exam',
            children: [
              {
                path: '',
                canActivate: [PermissionGuard],
                loadChildren: async () =>
                  (await import('./examination/exam/exam.routing')).ROUTES,
              },
              {
                path: 'data',
                canActivate: [PermissionGuard],
                data: {
                  roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
                },
                loadChildren: async () =>
                  (await import('./examination/data/data.routing')).ROUTES,
              },
              {
                path: 'handover',
                canActivate: [PermissionGuard],
                data: {
                  roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
                },
                loadChildren: async () =>
                  (await import('./examination/handover/handover.routing'))
                    .ROUTES,
              },
            ],
          },
          {
            path: 'invigilator',
            children: [
              {
                path: 'assign-faculty',
                canActivate: [PermissionGuard],
                data: {
                  roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
                },
                loadChildren: async () =>
                  (
                    await import(
                      './invigilator/assign-faculty/assign-faculty.routing'
                    )
                  ).ROUTES,
              },
              {
                path: 'assign-teacher',
                canActivate: [PermissionGuard],
                data: {
                  roles: [Role.TEACHER],
                },
                loadChildren: async () =>
                  (
                    await import(
                      './invigilator/assign-teacher/assign-teacher.routing'
                    )
                  ).ROUTES,
              },
              {
                path: 'assign-room',
                canActivate: [PermissionGuard],
                data: {
                  roles: [Role.EXAMINATION_DEPARTMENT_HEAD],
                },
                loadChildren: async () =>
                  (
                    await import(
                      './invigilator/assign-room/assign-room.routing'
                    )
                  ).ROUTES,
              },
            ],
          },
          {
            path: 'paid',
            children: [
              {
                path: 'invigilator',
                loadChildren: async () =>
                  (await import('./paid/invigilator/invigilator.routing'))
                    .ROUTES,
              },
              {
                path: 'invigilator-department',
                loadChildren: async () =>
                  (
                    await import(
                      './paid/invigilator-department/invigilator-department.routing'
                    )
                  ).ROUTES,
              },
              {
                path: 'exam-department',
                loadChildren: async () =>
                  (
                    await import(
                      './paid/exam-department/exam-department.routing'
                    )
                  ).ROUTES,
              },
            ],
          },
          {
            path: 'process',
            loadChildren: async () =>
              (await import('./examination/process/process.routing')).ROUTES,
          },
          {
            path: 'report',
            loadChildren: async () =>
              (await import('./examination/report/report.routing')).ROUTES,
          },
          {
            path: 'document',
            loadChildren: async () =>
              (await import('./examination/document/document.routing')).ROUTES,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
