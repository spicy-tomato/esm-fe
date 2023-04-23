import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Status, StringifyHelper } from '@esm/cdk';
import {
  ExaminationStatus,
  GetGroupByFacultyIdResponseItem,
  UpdateTeacherAssignmentRequest,
  UserSimple,
  UserSummary,
} from '@esm/data';
import { LetModule } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiFilterPipeModule } from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiLoaderModule,
  TuiNotification,
  TuiScrollbarModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiComboBoxModule, TuiSelectModule } from '@taiga-ui/kit';
import { filter, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InvigilatorAssignTeacherStore } from './assign-teacher.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiComboBoxModule,
  TuiDataListModule,
  TuiFilterPipeModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSelectModule,
  TuiTableModule,
  TuiTextfieldControllerModule,
];

type FormType = {
  [key: string]: FormGroup<{
    departmentId: FormControl<string | null>;
    user: FormControl<UserSimple | UserSummary | null>;
    shiftGroup: FormControl<
      GetGroupByFacultyIdResponseItem['facultyShiftGroup']['shiftGroup']
    >;
  }>;
};

@Component({
  templateUrl: './assign-teacher.component.html',
  styleUrls: ['./assign-teacher.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  providers: [
    provideComponentStore(InvigilatorAssignTeacherStore),
    tuiButtonOptionsProvider({ size: 'm' }),
  ],
})
export class InvigilatorAssignTeacherComponent implements OnInit {
  // INJECTS
  private readonly alertService = inject(TuiAlertService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(InvigilatorAssignTeacherStore);

  // PROPERTIES
  form?: FormGroup<FormType>;
  columns = [
    'index',
    'moduleId',
    'moduleName',
    'startAt',
    'shift',
    'department',
    'teacher',
    'phoneNumber',
  ];
  customValues: Record<string, string | null> = {};

  readonly stringify = StringifyHelper.idName;
  readonly hideAutoAssign = environment.production;
  readonly ExaminationStatus = ExaminationStatus;

  readonly data$ = this.store.data$;
  readonly faculties$ = this.store.faculties$;
  readonly dataError$ = this.store.dataError$;
  readonly dataStatus$ = this.store.dataStatus$;
  readonly updateStatus$ = this.store.updateStatus$;
  readonly autoAssignStatus$ = this.store.autoAssignStatus$;
  readonly tableObservables$ = this.store.tableObservables$;
  readonly headerObservables$ = this.store.headerObservables$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleBuildForm();
    this.handleUpdateStatusChanges();

    this.store.getData();
    this.store.getInvigilatorsData();
  }

  // PUBLIC METHODS
  readonly invigilatorMatcher = (
    item: UserSummary,
    departmentId: string
  ): boolean => {
    return item.department?.id === departmentId;
  };

  readonly invigilatorIdentityMatcher = (
    a: UserSummary,
    b: UserSummary
  ): boolean => {
    return a.invigilatorId === b.invigilatorId;
  };

  /**
   * Called when select faculty from input select, only used if user has role `ExaminationDepartmentHead`
   */
  onSelectFaculty(facultyId: string): void {
    this.store.changeFaculty(facultyId);
  }

  autoAssign(): void {
    this.store.autoAssign();
  }

  saveChange(): void {
    if (!this.form) {
      return;
    }

    const dataToSave: UpdateTeacherAssignmentRequest = {};

    Object.entries(this.form.controls).forEach(
      ([departmentShiftGroupId, control]) => {
        if (control.pristine) return;

        const { departmentId, user } = control.getRawValue();

        dataToSave[departmentShiftGroupId] = {
          departmentId,
          userId: user?.id ?? null,
          temporaryInvigilatorName:
            user === null ? this.customValues[departmentShiftGroupId] : null,
        };
      }
    );

    this.store.save(dataToSave);
  }

  // PRIVATE METHODS
  private handleBuildForm(): void {
    this.data$
      .pipe(
        filter((data) => !!data.length),
        tap((data) => this.buildForm(data))
      )
      .subscribe();
  }

  private buildForm(data: GetGroupByFacultyIdResponseItem[]): void {
    this.form = this.fb.group(
      data.reduce<FormType>((acc, curr) => {
        acc[curr.id] = this.fb.group({
          departmentId: [curr.departmentId],
          user: [
            curr.user ??
              (curr.temporaryInvigilatorName !== null
                ? Object.assign(new UserSummary(), {
                    fullName: curr.temporaryInvigilatorName,
                  })
                : null),
          ],
          shiftGroup: [curr.facultyShiftGroup.shiftGroup],
        });
        return acc;
      }, {})
    );

    this.customValues = data.reduce<Record<string, string | null>>(
      (acc, curr) => {
        acc[curr.id] = null;
        return acc;
      },
      {}
    );
  }

  private handleUpdateStatusChanges(): void {
    const func = (status: Status) =>
      status === 'success'
        ? this.alertService.open('Cập nhật thành công!', {
            status: TuiNotification.Success,
          })
        : status === 'error'
        ? this.alertService.open('Đã có lỗi xảy ra, vui lòng thử lại sau!', {
            label: 'Lỗi',
            status: TuiNotification.Error,
          })
        : of();

    this.updateStatus$.pipe(switchMap(func)).subscribe();
    this.autoAssignStatus$.pipe(switchMap(func)).subscribe();
  }
}
