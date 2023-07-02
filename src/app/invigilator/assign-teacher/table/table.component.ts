import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { StringifyHelper } from '@esm/cdk';
import { ArrayPipe } from '@esm/core';
import {
  DepartmentSummary,
  GetGroupByFacultyIdResponseItem,
  UpdateTeacherAssignmentRequest,
  UserSimple,
  UserSummary,
} from '@esm/data';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiDestroyService, TuiFilterPipeModule, tuiPure } from '@taiga-ui/cdk';
import { TuiDataListModule, TuiScrollbarModule } from '@taiga-ui/core';
import { TuiComboBoxModule, TuiSelectModule } from '@taiga-ui/kit';
import { filter, takeUntil, tap } from 'rxjs';
import { InvigilatorAssignTeacherStore } from '../assign-teacher.store';

export const TAIGA_UI = [
  TuiComboBoxModule,
  TuiDataListModule,
  TuiFilterPipeModule,
  TuiScrollbarModule,
  TuiSelectModule,
  TuiTableModule,
];

type FormType = {
  [key: string]: FormGroup<{
    departmentId: FormControl<string | null>;
    user: FormControl<UserSimple | UserSummary | null>;
    facultyShiftGroup: FormControl<
      GetGroupByFacultyIdResponseItem['facultyShiftGroup']
    >;
  }>;
};

@Component({
  selector: 'esm-invigilator-assign-teacher-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    LetModule,
    ArrayPipe,
    ...TAIGA_UI,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class InvigilatorAssignTeacherTableComponent implements OnInit {
  // INJECTS
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly store = inject(InvigilatorAssignTeacherStore);
  private readonly destroy$ = inject(TuiDestroyService);

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

  /**
   * Used to mark selected invigilators, to exclude from combo box
   * @field key  : facultyShiftGroupId
   * @field value: array of selected invigilators in shift
   */
  selectedInvigilatorsInShift: Record<string, string[]> = {};

  readonly stringify = StringifyHelper.idName;
  readonly data$ = this.store.data$;
  readonly tableObservables$ = this.store.tableObservables$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleBuildForm();
  }

  // PUBLIC METHODS
  readonly invigilatorMatcher = (
    invigilator: UserSummary,
    departmentId: string,
    facultyShiftGroupId: string
  ): boolean => {
    return (
      invigilator.department?.id === departmentId &&
      !this.selectedInvigilatorsInShift[facultyShiftGroupId]?.includes(
        invigilator.id
      )
    );
  };

  readonly invigilatorIdentityMatcher = (
    a: UserSummary,
    b: UserSummary
  ): boolean => {
    return a.invigilatorId === b.invigilatorId;
  };

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

  @tuiPure
  getDepartmentOfAnonymousInvigilator(
    departments: DepartmentSummary[],
    departmentId?: string | null
  ): string {
    if (!departmentId) return '';

    return departments.find((d) => d.id === departmentId)?.name ?? '';
  }

  onInvigilatorChanges(facultyShiftGroupId: string): void {
    const currentSelectedInvigilatorsIdInForm = Object.values(
      this.form?.getRawValue() ?? {}
    )
      .filter((row) => row.facultyShiftGroup.id === facultyShiftGroupId)
      .map((row) => row.user?.id)
      .filter((id): id is string => !!id);

    this.selectedInvigilatorsInShift[facultyShiftGroupId] =
      currentSelectedInvigilatorsIdInForm;
  }

  // PRIVATE METHODS
  private handleBuildForm(): void {
    this.data$
      .pipe(
        filter((data) => !!data.length),
        tap((data) => {
          this.buildForm(data);
          this.updateSelectedInvigilators(data);
          this.cdr.markForCheck();
        })
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
          facultyShiftGroup: [curr.facultyShiftGroup],
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

    this.form.valueChanges
      .pipe(
        tap(() => this.store.patchState({ disableSaveBtn: false })),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private updateSelectedInvigilators(
    data: GetGroupByFacultyIdResponseItem[]
  ): void {
    const result: Record<string, string[]> = {};

    data.forEach((row) => {
      if (!result[row.facultyShiftGroup.id]) {
        result[row.facultyShiftGroup.id] = [];
      }

      if (row.user) {
        result[row.facultyShiftGroup.id].push(row.user.id);
      }
    });

    this.selectedInvigilatorsInShift = result;
  }
}
