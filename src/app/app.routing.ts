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
        path: '',
        loadChildren: async () =>
          (await import('./home/home.module')).HomeModule,
      },
      {
        path: 'create',
        loadChildren: async () =>
          (await import('./examination/create/create.module')).CreateModule,
      },
      {
        path: 'data',
        loadChildren: async () =>
          (await import('./data/data.module')).DataModule,
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
            loadChildren: async () =>
              (await import('./examination/general/general.module'))
                .ExaminationGeneralModule,
          },
          {
            path: 'exam',
            children: [
              {
                path: '',
                loadChildren: async () =>
                  (await import('./examination/exam/exam.module')).ExaminationExamModule,
              },
              {
                path: 'data',
                loadChildren: async () =>
                  (await import('./examination/data/data.module'))
                    .ExaminationDataModule,
              },
              {
                path: 'handover',
                loadChildren: async () =>
                  (await import('./examination/handover/handover.module'))
                    .ExaminationHandoverModule,
              },
            ],
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
            path: 'paid',
            children: [
              {
                path: 'invigilator',
                loadChildren: async () =>
                  (await import('./paid/invigilator/invigilator.module'))
                    .PaidInvigilatorModule,
              },
              {
                path: 'invigilator-department',
                loadChildren: async () =>
                  (
                    await import(
                      './paid/invigilator-department/invigilator-department.module'
                    )
                  ).PaidInvigilatorDepartmentModule,
              },
              {
                path: 'exam-department',
                loadChildren: async () =>
                  (
                    await import(
                      './paid/exam-department/exam-department.module'
                    )
                  ).PaidExamDepartmentModule,
              },
            ],
          },
          {
            path: 'process',
            loadChildren: async () =>
              (await import('./examination/process/process.module'))
                .ExaminationProcessModule,
          },
          {
            path: 'report',
            loadChildren: async () =>
              (await import('./examination/report/report.module'))
                .ExaminationReportModule,
          },
          {
            path: 'document',
            loadChildren: async () =>
              (await import('./examination/document/document.module'))
                .ExaminationDocumentModule,
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
