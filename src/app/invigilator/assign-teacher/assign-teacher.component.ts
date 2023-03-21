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
import {
  DepartmentSummary,
  ExaminationStatus,
  GetGroupByFacultyIdResponseItem,
  UpdateTeacherAssignmentRequest,
  UserSimple,
  UserSummary,
} from '@esm/data';
import { VarDirective } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiContextWithImplicit,
  TuiFilterPipeModule,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiLoaderModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiComboBoxModule, TuiSelectModule } from '@taiga-ui/kit';
import { combineLatest, filter, map, tap } from 'rxjs';
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
    VarDirective,
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
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(InvigilatorAssignTeacherStore);

  // PUBLIC PROPERTIES
  form?: FormGroup<FormType>;
  columns = [
    'moduleId',
    'moduleName',
    'startAt',
    'shift',
    'department',
    'teacher',
  ];
  customValues: Record<string, string | null> = {};

  readonly data$ = this.store.data$;
  readonly faculty$ = this.store.faculty$;
  readonly dataStatus$ = this.store.dataStatus$;
  readonly examination$ = this.store.examination$;
  readonly departments$ = this.store.departmentsInFaculty$;
  readonly updateStatus$ = this.store.updateStatus$;
  readonly invigilatorsData$ = this.store.invigilatorsData$;
  readonly showLoader$ = combineLatest([
    this.store.dataStatus$,
    this.store.autoAssignStatus$,
  ]).pipe(map((statuses) => statuses.includes('loading')));
  readonly ExaminationStatus = ExaminationStatus;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleBuildForm();
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

    Object.entries(this.form.controls).forEach(([controlName, control]) => {
      if (control.pristine) return;

      const { departmentId, user } = control.getRawValue();

      dataToSave[controlName] = {
        departmentId,
        userId: user?.id ?? null,
        temporaryInvigilatorName:
          user === null ? this.customValues[controlName] : null,
      };
    });

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
}
