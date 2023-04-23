import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StringifyHelper } from '@esm/cdk';
import { TemporaryExamination } from '@esm/data';
import { LetModule } from '@ngrx/component';
import { TuiFilterPipeModule } from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiDialogContext,
  TuiLabelModule,
  TuiNotification,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiInputModule, TuiSelectModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { filter, take, tap } from 'rxjs';
import {
  AddModuleDialogDepartment,
  AddModuleDialogStore,
} from './add-module.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiFilterPipeModule,
  TuiInputModule,
  TuiLabelModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
];

@Component({
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...NGRX, ...TAIGA_UI],
  providers: [AddModuleDialogStore, tuiButtonOptionsProvider({ size: 'm' })],
})
export class AddModuleDialogComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(AddModuleDialogStore);
  private readonly alertService = inject(TuiAlertService);
  private readonly context = inject(POLYMORPHEUS_CONTEXT) as TuiDialogContext<
    boolean,
    TemporaryExamination
  >;

  // PUBLIC PROPERTIES
  form = this.fb.group({
    moduleId: [this.context.data.moduleId, Validators.required],
    moduleName: [this.context.data.moduleName, Validators.required],
    faculty: ['', Validators.required],
    department: [''],
  });

  readonly stringify = StringifyHelper.idName;
  readonly faculties$ = this.store.faculties$;
  readonly departments$ = this.store.departments$;
  readonly status$ = this.store.status$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleGetFacultiesAndDepartmentsData();
    this.handleCreateSuccess();
  }

  // PUBLIC METHODS
  readonly departmentMatcher = (item: AddModuleDialogDepartment): boolean =>
    item.facultyId === this.form.controls.faculty.value;

  onCreate(): void {
    const { moduleId, moduleName, faculty, department } = this.form.value;
    this.store.create({
      displayId: moduleId!,
      name: moduleName!,
      facultyId: faculty!,
      departmentId: department ?? null,
    });
  }

  // PRIVATE METHODS
  private handleGetFacultiesAndDepartmentsData(): void {
    this.faculties$
      .pipe(
        tap((faculties) => {
          const currentFacultyId = faculties.find(
            (f) =>
              f.name.toUpperCase() === this.context.data.faculty?.toUpperCase()
          )?.id;
          if (currentFacultyId) {
            this.form.controls.faculty.setValue(currentFacultyId);
          }
        }),
        take(1)
      )
      .subscribe();

    this.departments$
      .pipe(
        tap((departments) => {
          const currentDepartmentId = departments.find(
            (d) =>
              d.name.toUpperCase() ===
              this.context.data.department?.toUpperCase()
          )?.id;
          if (currentDepartmentId) {
            this.form.controls.department.setValue(currentDepartmentId);
          }
        }),
        take(1)
      )
      .subscribe();
  }

  private handleCreateSuccess(): void {
    this.status$
      .pipe(
        filter((s) => s === 'success'),
        tap(() => {
          this.alertService
            .open('Thêm học phần thành công!', {
              status: TuiNotification.Success,
            })
            .subscribe();
          this.context.completeWith(true);
        })
      )
      .subscribe();
  }
}
