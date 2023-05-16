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
import {
  GetGroupByFacultyIdResponseItem,
  UpdateTeacherAssignmentRequest,
  UserSimple,
  UserSummary,
} from '@esm/data';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiDestroyService, TuiFilterPipeModule } from '@taiga-ui/cdk';
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
    shiftGroup: FormControl<
      GetGroupByFacultyIdResponseItem['facultyShiftGroup']['shiftGroup']
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

  readonly stringify = StringifyHelper.idName;
  readonly data$ = this.store.data$;
  readonly tableObservables$ = this.store.tableObservables$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleBuildForm();
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
        tap((data) => {
          this.buildForm(data);
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

    this.form.valueChanges
      .pipe(
        tap(() => this.store.patchState({ disableSaveBtn: false })),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
