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
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Status } from '@esm/cdk';
import {
  DepartmentSummary,
  ExaminationStatus,
  GetGroupByFacultyIdResponseItem,
  UpdateTeacherAssignmentRequest,
  UserSimple,
  UserSummary,
} from '@esm/data';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiContextWithImplicit,
  TuiFilterPipeModule,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiLoaderModule,
  TuiNotification,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiComboBoxModule, TuiSelectModule } from '@taiga-ui/kit';
import { combineLatest, filter, map, of, switchMap, tap } from 'rxjs';
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
    ReactiveFormsModule,
    ScrollingModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  providers: [
    InvigilatorAssignTeacherStore,
    tuiButtonOptionsProvider({ size: 'm' }),
  ],
})
export class InvigilatorAssignTeacherComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly alertService = inject(TuiAlertService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(InvigilatorAssignTeacherStore);

  // PUBLIC PROPERTIES
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

  readonly hideAutoAssign = environment.production;
  readonly ExaminationStatus = ExaminationStatus;
  readonly data$ = this.store.data$;
  readonly faculty$ = this.store.faculty$;
  readonly dataError$ = this.store.dataError$;
  readonly dataStatus$ = this.store.dataStatus$;
  readonly examination$ = this.store.examination$;
  readonly updateStatus$ = this.store.updateStatus$;
  readonly autoAssignStatus$ = this.store.autoAssignStatus$;
  readonly departments$ = this.store.departmentsInFaculty$;
  readonly invigilatorsData$ = this.store.invigilatorsData$;
  readonly invigilatorPhoneNumberMap$ = this.store.invigilatorPhoneNumberMap$;
  readonly showLoader$ = combineLatest([
    this.store.dataStatus$,
    this.store.autoAssignStatus$,
  ]).pipe(map((statuses) => statuses.includes('loading')));

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

  @tuiPure
  departmentStringify(
    items: readonly DepartmentSummary[]
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [string, string])
    );

    return ({ $implicit }: TuiContextWithImplicit<string>) =>
      map.get($implicit) || '';
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
