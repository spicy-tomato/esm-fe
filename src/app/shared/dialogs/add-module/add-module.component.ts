import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DepartmentSimple, TemporaryExamination } from '@esm/data';
import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  TuiAlertService,
  tuiButtonOptionsProvider,
  TuiDialogContext,
  TuiNotification,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { filter, take, tap } from 'rxjs';
import {
  AddModuleDialogDepartment,
  AddModuleDialogFaculty,
  AddModuleDialogStore,
} from './add-module.store';

@Component({
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AddModuleDialogStore, tuiButtonOptionsProvider({ size: 'm' })],
})
export class AddModuleDialogComponent implements OnInit {
  // PUBLIC PROPERTIES
  form = this.fb.group({
    moduleId: [this.context.data.moduleId, Validators.required],
    moduleName: [this.context.data.moduleName, Validators.required],
    faculty: ['', Validators.required],
    department: [''],
  });
  readonly faculties$ = this.store.faculties$;
  readonly departments$ = this.store.departments$;
  readonly status$ = this.store.status$;

  // CONSTRUCTOR
  constructor(
    private readonly fb: FormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, TemporaryExamination>,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private readonly store: AddModuleDialogStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.handleGetFacultiesAndDepartmentsData();
    this.handleCreateSuccess();
  }

  // PUBLIC METHODS
  @tuiPure
  facultyStringify(
    items: readonly AddModuleDialogFaculty[]
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [string, string])
    );

    return ({ $implicit }: TuiContextWithImplicit<string>) =>
      map.get($implicit) || '';
  }

  @tuiPure
  departmentStringify(
    items: readonly DepartmentSimple[]
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [string, string])
    );

    return ({ $implicit }: TuiContextWithImplicit<string>) =>
      map.get($implicit) || '';
  }

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
