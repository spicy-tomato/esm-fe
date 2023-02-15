import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@esm/guards';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: async () =>
      (await import('./user/login/login.module')).LoginModule,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'create',
        loadChildren: async () =>
          (await import('./examination/create/create.module')).CreateModule,
      },
      {
        path: 'notification',
        loadChildren: async () =>
          (await import('./notification/notification.module'))
            .NotificationModule,
      },
      {
        path: ':examinationId',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'exam',
          },
          {
            path: 'exam',
            loadChildren: async () =>
              (await import('./examination/exam/exam.module')).ExamModule,
          },
          {
            path: 'invigilator',
            children: [
              {
                path: 'assign-faculty',
                loadChildren: async () =>
                  (
                    await import(
                      './invigilator/assign-faculty/assign-faculty.module'
                    )
                  ).InvigilatorAssignFacultyModule,
              },
              {
                path: 'assign-teacher',
                loadChildren: async () =>
                  (
                    await import(
                      './invigilator/assign-teacher/assign-teacher.module'
                    )
                  ).InvigilatorAssignTeacherModule,
              },
              {
                path: 'assign-room',
                loadChildren: async () =>
                  (await import('./invigilator/assign-room/assign-room.module'))
                    .InvigilatorAssignRoomModule,
              },
            ],
          },
          {
            path: 'statistic',
            loadChildren: async () =>
              (await import('./examination/statistic/statistic.module'))
                .StatisticModule,
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
