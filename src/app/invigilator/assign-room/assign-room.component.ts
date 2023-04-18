import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ArrayPipe, ExamMethodPipe, ObjectPipe } from '@esm/core';
import {
  AssignInvigilatorsToShiftsRequest,
  ExaminationStatus,
  GetAvailableInvigilatorsInShiftGroupTemporaryInvigilator,
  GetAvailableInvigilatorsInShiftGroupVerifiedInvigilator,
  UserSummary,
} from '@esm/data';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiDialogService,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { BehaviorSubject, combineLatest, filter, map, tap } from 'rxjs';
import { InvigilatorAssignRoomStore, ShiftUiModel } from './assign-room.store';
import {
  PolymorpheusComponent,
  PolymorpheusModule,
} from '@tinkoff/ng-polymorpheus';
import { EditInvigilatorDialogComponent } from '@esm/shared/dialogs';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiComboBoxModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSelectModule,
  TuiSvgModule,
  TuiTableModule,
  TuiTextfieldControllerModule,
];

type InvigilatorItem =
  | {
      id: string;
      fullName: string;
    }
  | { temporaryName: string };

@Component({
  templateUrl: './assign-room.component.html',
  styleUrls: ['./assign-room.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PolymorpheusModule,
    ScrollingModule,
    EditInvigilatorDialogComponent,
    ArrayPipe,
    ObjectPipe,
    ExamMethodPipe,
    ...NGRX,
    ...TAIGA_UI,
  ],
  providers: [
    InvigilatorAssignRoomStore,
    tuiButtonOptionsProvider({ size: 'm' }),
  ],
})
export class InvigilatorAssignRoomComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly dialogService = inject(TuiDialogService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly injector = inject(Injector);
  private readonly store = inject(InvigilatorAssignRoomStore);

  // PUBLIC PROPERTIES
  form?: FormGroup<{
    [key: string]: FormControl<string | null>;
  }>;
  columns = [
    'index',
    'moduleId',
    'moduleName',
    'startAt',
    'shift',
    'room',
    'orderIndex',
    'teacher',
    'teacherFaculty',
    'teacherDepartment',
    'phoneNumber',
  ];

  readonly ExaminationStatus = ExaminationStatus;
  readonly temporaryInvigilatorModel!: GetAvailableInvigilatorsInShiftGroupTemporaryInvigilator;
  readonly selectionContext!: {
    $implicit: GetAvailableInvigilatorsInShiftGroupVerifiedInvigilator;
    shiftGroupId: string;
  };
  readonly data$ = this.store.data$;
  readonly dataStatus$ = this.store.dataStatus$;
  readonly examination$ = this.store.examination$;
  readonly updateStatus$ = this.store.updateStatus$;
  readonly invigilatorsData$ = this.store.invigilatorsData$;
  readonly invigilatorFacultyMap$ = this.store.invigilatorFacultyMap$;
  readonly invigilatorsList$ = this.invigilatorsData$.pipe(
    map((data) => {
      const res: InvigilatorItem[] = [];

      Object.values(data).forEach((invigilators) => {
        invigilators.forEach((i) => {
          res.push(i);
        });
      });

      return res;
    })
  );
  readonly usedInvigilatorsMap$ = new BehaviorSubject<
    Record<string, Record<string, string | null>>
  >({});
  readonly showLoader$ = combineLatest([
    this.store.dataStatus$,
    this.store.autoAssignStatus$,
  ]).pipe(map((statuses) => statuses.includes('loading')));
  readonly tableObservables$ = combineLatest([
    this.data$,
    this.invigilatorsData$,
    this.invigilatorsList$,
    this.invigilatorFacultyMap$,
    this.usedInvigilatorsMap$,
  ]).pipe(
    map((arr) => ({
      data: arr[0],
      invigilatorsData: arr[1],
      invigilatorsList: arr[2],
      invigilatorFacultyMap: arr[3],
      usedInvigilatorsMap: arr[4],
    }))
  );

  // LIFECYCLE
  ngOnInit(): void {
    this.handleBuildForm();
    this.handleUpdateUsedInvigilatorMap();
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
  invigilatorStringify(
    items: InvigilatorItem[]
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(
      items
        .filter(
          (
            item
          ): item is {
            id: string;
            fullName: string;
          } => 'id' in item
        )
        .map(({ id, fullName }) => [id, fullName] as [string, string])
    );

    return ({ $implicit }: TuiContextWithImplicit<string>) =>
      map.get($implicit) || '';
  }

  onInvigilatorChanges(
    currentShiftGroupId: string,
    currentShiftId: string,
    newInvigilatorId: string
  ): void {
    const newValue = this.usedInvigilatorsMap$.value;
    newValue[currentShiftGroupId] ??= {};
    const shiftGroupDataEntries = Object.entries(newValue[currentShiftGroupId]);

    // Remove old invigilator
    for (const [invigilatorId, shiftId] of shiftGroupDataEntries) {
      if (shiftId === currentShiftId) {
        delete newValue[currentShiftGroupId][invigilatorId];
      }
    }

    // Assign new one
    if (newInvigilatorId) {
      newValue[currentShiftGroupId][newInvigilatorId] = currentShiftId;
    }

    this.usedInvigilatorsMap$.next(newValue);
  }

  autoAssign(): void {
    this.store.autoAssign();
  }

  saveChange(): void {
    if (!this.form) {
      return;
    }

    const dataToSave: AssignInvigilatorsToShiftsRequest = {};

    Object.entries(this.form.controls).forEach(([controlName, control]) => {
      if (control.pristine) return;
      const invigilatorId = control.getRawValue();
      dataToSave[controlName] = invigilatorId;
    });

    this.store.save(dataToSave);
  }

  onAddNewInvigilator(
    invigilatorName: string,
    departmentId: string,
    shiftGroupId: string
  ): void {
    this.dialogService
      .open<UserSummary>(
        new PolymorpheusComponent(
          EditInvigilatorDialogComponent,
          this.injector
        ),
        { data: { invigilatorName, departmentId } }
      )
      .pipe(
        filter((x) => !!x),
        tap(({ id }) =>
          this.store.updateTeacherAssignment({
            shiftGroupId,
            departmentId,
            userId: id,
          })
        )
      )
      .subscribe();
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

  private buildForm(data: ShiftUiModel[]): void {
    this.form = this.fb.group(
      data.reduce((acc, curr) => {
        acc[curr.id] = [curr.invigilator?.id ?? null];
        return acc;
      }, {} as Record<string, (string | null)[]>)
    );
  }

  private handleUpdateUsedInvigilatorMap(): void {
    this.data$
      .pipe(
        tap((data) => {
          const res: Record<string, Record<string, string>> = {};

          data.forEach((shift) => {
            if (shift.invigilator?.id) {
              res[shift.shiftGroup.id] ??= {};
              res[shift.shiftGroup.id][shift.invigilator.id] = shift.id;
            }
          });

          this.usedInvigilatorsMap$.next(res);
        })
      )
      .subscribe();
  }
}
