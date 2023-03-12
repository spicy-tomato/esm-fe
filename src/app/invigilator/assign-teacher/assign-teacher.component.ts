import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import {
  DepartmentShiftGroupSimple,
  DepartmentSummary,
  ShiftGroupInDepartmentShiftGroupSimple,
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
    id: FormControl<string>;
    departmentId: FormControl<string | null>;
    user: FormControl<UserSimple | null>;
    shiftGroup: FormControl<ShiftGroupInDepartmentShiftGroupSimple>;
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
    // this.isSaving$.next(true);
    // setTimeout(() => {
    //   data = (this.form.controls['assign'] as FormArray).value;
    //   this.isSaving$.next(false);
    // }, 1000);
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

  private buildForm(data: DepartmentShiftGroupSimple[]): void {
    this.form = this.fb.group(
      data.reduce<FormType>((acc, curr) => {
        acc[curr.id] = this.fb.group({
          id: [curr.id],
          departmentId: [curr.departmentId],
          user: [curr.user],
          shiftGroup: [curr.facultyShiftGroup.shiftGroup],
        });
        return acc;
      }, {})
    );
  }
}
