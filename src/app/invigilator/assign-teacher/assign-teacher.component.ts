import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import {
  GetGroupByFacultyIdResponseItem,
  DepartmentSummary,
  UpdateTeacherAssignmentRequest,
  UserSimple,
  UserSummary,
} from '@esm/data';
import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import { tuiButtonOptionsProvider } from '@taiga-ui/core';
import { filter, tap } from 'rxjs';
import { InvigilatorAssignTeacherStore } from './assign-teacher.store';

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
  providers: [
    InvigilatorAssignTeacherStore,
    tuiButtonOptionsProvider({ size: 'm' }),
  ],
})
export class InvigilatorAssignTeacherComponent implements OnInit {
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
  readonly departments$ = this.store.departmentsInFaculty$;
  readonly updateStatus$ = this.store.updateStatus$;
  readonly invigilatorsData$ = this.store.invigilatorsData$;

  // CONSTRUCTOR
  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly store: InvigilatorAssignTeacherStore
  ) {}

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
