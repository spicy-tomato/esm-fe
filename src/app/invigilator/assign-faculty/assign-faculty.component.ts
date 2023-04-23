import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ArrayPipe, ExamMethodPipe } from '@esm/core';
import {
  ExaminationStatus,
  FacultySummary,
  GetAllGroupsResponseResponseItem,
} from '@esm/data';
import { ConfirmDialogComponent } from '@esm/shared/dialogs';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiAlertService,
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogService,
  TuiLoaderModule,
  TuiNotification,
  TuiScrollbarModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import { TuiInputNumberComponent, TuiInputNumberModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { combineLatest, map, of, switchMap, tap } from 'rxjs';
import { InvigilatorAssignFacultyStore } from './assign-faculty.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiInputNumberModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiTableModule,
  TuiTooltipModule,
];

@Component({
  templateUrl: './assign-faculty.component.html',
  styleUrls: ['./assign-faculty.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    ArrayPipe,
    ExamMethodPipe,
    ...NGRX,
    ...TAIGA_UI,
  ],
  providers: [
    InvigilatorAssignFacultyStore,
    tuiButtonOptionsProvider({ size: 'm' }),
  ],
})
export class InvigilatorAssignFacultyComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly injector = inject(Injector);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly alertService = inject(TuiAlertService);
  private readonly dialogService = inject(TuiDialogService);
  private readonly store = inject(InvigilatorAssignFacultyStore);

  // VIEWCHILD
  @ViewChild('input') input!: TuiInputNumberComponent;
  @ViewChild('viewport') viewport!: CdkVirtualScrollViewport;

  // PUBLIC PROPERTIES
  form!: FormGroup;
  inputValue = 0;
  inputOldValue = 0;
  inputStyle: {
    top: string;
    left: string;
    width: string;
    height: string;
  } | null = null;
  focusedCellData: {
    rowId: number;
    facultyId: string;
  } | null = null;
  focusedControl: FormControl | null = null;

  readonly data$ = this.store.data$;
  readonly faculties$ = this.store.faculties$;
  readonly updateRows$ = this.store.updateRows$;
  readonly dataStatus$ = this.store.dataStatus$;
  readonly examination$ = this.store.examination$;
  readonly finishStatus$ = this.store.finishStatus$;
  readonly calculateStatus$ = this.store.calculateStatus$;
  readonly columns$ = this.store.faculties$.pipe(
    map((faculties) => [
      'index',
      'moduleId',
      'moduleName',
      'method',
      'startAt',
      'shift',
      'facultyName',
      'roomsCount',
      'invigilatorsCount',
      ...faculties.map((f) => f.id),
      'total',
      'difference',
    ])
  );
  readonly ExaminationStatus = ExaminationStatus;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleBuildForm();
    this.handleFinish();
    this.store.getData();
  }

  // PUBLIC METHODS
  get formControl(): FormArray {
    return this.form.controls['data'] as FormArray;
  }

  facultyControl(index: number, facultyId: string): FormControl {
    return (this.form.controls['data'] as FormArray)
      .at(index)
      .get(facultyId) as FormControl;
  }

  calculate(): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(ConfirmDialogComponent, this.injector),
        {
          data: {
            message:
              'Thao tác này sẽ làm mới toàn bộ dữ liệu phân giảng trong kỳ thi. Vẫn tiếp tục?',
            onConfirm: this.store.calculate,
            confirmStatus: this.store.calculateStatus$,
          },
        }
      )
      .subscribe();
  }

  finishAssign(): void {
    this.store.finishAssign();
  }

  onDoubleClickCell(evt: MouseEvent, rowId: number, facultyId: string): void {
    this.focusedControl = this.facultyControl(rowId, facultyId);
    this.inputValue = this.inputOldValue = this.focusedControl.value.actual;
    this.focusedCellData = { rowId, facultyId };

    const boundingRect = (
      evt.target as HTMLTableCellElement
    ).getBoundingClientRect();
    const target = evt.target as HTMLTableCellElement;

    this.inputStyle = {
      top: target.offsetTop + 'px',
      left: target.offsetLeft + 'px',
      width: boundingRect.width + 'px',
      height: boundingRect.height + 'px',
    };

    setTimeout(() => {
      this.input.nativeFocusableElement?.select();
    });
  }

  onFocusedChange(focus: boolean): void {
    if (!focus && this.focusedCellData) {
      if (this.inputValue !== this.inputOldValue) {
        const { rowId, facultyId } = this.focusedCellData;
        this.store.save({
          rowId,
          facultyId,
          numberOfInvigilator: this.inputValue,
        });
      }

      this.inputStyle = null;
      this.focusedControl = null;
      this.focusedCellData = null;
    }
  }

  // PRIVATE METHODS
  private handleBuildForm(): void {
    combineLatest([this.faculties$, this.data$])
      .pipe(tap(([faculties, data]) => this.buildForm(faculties, data)))
      .subscribe();
  }

  private handleFinish(): void {
    this.finishStatus$
      .pipe(
        switchMap((status) => {
          if (status === 'success')
            return this.alertService.open('Đã chốt số lượng CBCT!', {
              status: TuiNotification.Success,
            });

          if (status === 'error')
            return this.alertService.open(
              'Số lượng CBCT thực tế khác so với CBCT cần thiết, vui lòng kiểm tra lại!',
              {
                label: 'Lỗi',
                status: TuiNotification.Error,
              }
            );

          return of();
        })
      )
      .subscribe();
  }

  private buildForm(
    faculties: FacultySummary[],
    data: GetAllGroupsResponseResponseItem[]
  ): void {
    this.form = this.fb.group({
      data: this.fb.array(
        data.map((row) =>
          this.fb.group({
            ...this.buildFormDataPart(row),
            ...this.buildFormFacultyPart(row, faculties),
            ...this.buildFormCalculatePart(row),
          })
        )
      ),
    }) as any;
  }

  private buildFormDataPart(
    group: GetAllGroupsResponseResponseItem
  ): Record<string, any[]> {
    const columns: (keyof GetAllGroupsResponseResponseItem)[] = [
      'module',
      'method',
      'startAt',
      'shift',
      'roomsCount',
      'invigilatorsCount',
    ];

    return columns.reduce((acc, curr) => {
      acc[curr] = [group[curr]];
      return acc;
    }, {} as Record<string, any[]>);
  }

  private buildFormFacultyPart(
    group: GetAllGroupsResponseResponseItem,
    faculties: FacultySummary[]
  ): Record<string, any[]> {
    return faculties.reduce((acc, { id }) => {
      acc[id] = [group.assignNumerate[id] || 0];
      return acc;
    }, {} as Record<string, any[]>);
  }

  private buildFormCalculatePart(
    group: GetAllGroupsResponseResponseItem
  ): Record<string, any[]> {
    return {
      total: [group.assignNumerate['total']],
    };
  }
}
