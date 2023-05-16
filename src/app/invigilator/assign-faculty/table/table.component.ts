import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { StringHelper } from '@esm/cdk';
import { ArrayPipe, ExamMethodPipe } from '@esm/core';
import {
  ExaminationStatus,
  FacultySummary,
  GetAllGroupsResponseResponseItem,
} from '@esm/data';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiScrollbarModule, TuiTooltipModule } from '@taiga-ui/core';
import { TuiInputNumberComponent, TuiInputNumberModule } from '@taiga-ui/kit';
import { Subject, combineLatest, map, takeUntil, tap } from 'rxjs';
import { utils, writeFileXLSX } from 'xlsx';
import { InvigilatorAssignFacultyStore } from '../assign-faculty.store';

export const TAIGA_UI = [
  TuiInputNumberModule,
  TuiScrollbarModule,
  TuiTableModule,
  TuiTooltipModule,
];

type InputStyle = {
  top: string;
  left: string;
  width: string;
  height: string;
};

type FocusedCellData = {
  rowId: number;
  facultyId: string;
};

@Component({
  selector: 'esm-invigilator-assign-faculty-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    LetModule,
    ArrayPipe,
    ExamMethodPipe,
    ...TAIGA_UI,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService, DatePipe],
})
export class InvigilatorAssignFacultyTableComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(InvigilatorAssignFacultyStore);
  private readonly datePipe = inject(DatePipe);
  private readonly destroy$ = inject(TuiDestroyService);

  @ViewChild('input') input!: TuiInputNumberComponent;

  form!: FormGroup<{ data: FormArray }>;
  inputValue = 0;
  inputOldValue = 0;
  inputStyle: InputStyle | null = null;
  focusedControl: FormControl | null = null;
  focusedCellData: FocusedCellData | null = null;

  readonly ExaminationStatus = ExaminationStatus;
  readonly exportFile$ = new Subject<void>();
  readonly tableObservables$ = this.store.tableObservables$;

  private readonly data$ = this.store.data$;
  private readonly faculties$ = this.store.faculties$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleBuildForm();
    this.handleExportFile();
  }

  // PUBLIC METHODS
  get formControl(): FormArray {
    return this.form.controls['data'] as FormArray;
  }

  onDoubleClickCell(evt: MouseEvent, rowId: number, facultyId: string): void {
    this.focusedControl = this.getFacultyControl(rowId, facultyId);
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

  exportFile(): void {
    this.exportFile$.next();
  }

  // PRIVATE METHODS
  private handleBuildForm(): void {
    combineLatest([this.faculties$, this.data$])
      .pipe(tap(([faculties, data]) => this.buildForm(faculties, data)))
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

  private getFacultyControl(index: number, facultyId: string): FormControl {
    return (this.form.controls['data'] as FormArray)
      .at(index)
      .get(facultyId) as FormControl;
  }

  private handleExportFile(): void {
    combineLatest([
      this.tableObservables$.pipe(map((ob) => ob.faculties)),
      this.exportFile$,
    ])
      .pipe(
        tap(([faculties]) => this.onExportFile(faculties)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private onExportFile(faculties: FacultySummary[]): void {
    const data = (this.form.value.data as any[]).map((row, idx) => {
      const res: Record<string, any> = {
        idx: idx + 1,
        moduleId: row.module.displayId,
        moduleName: row.module.name,
        faculty: row.module.faculty.name,
        method: StringHelper.getExamMethod(row.method),
        startAt: this.datePipe.transform(row.startAt, 'dd/MM/y'),
        total: row.total.actual,
        difference: row.total.calculated,
        _shift: row.shift,
      };

      const ignoreColumns = ['module', 'total', 'method', 'shift', 'startAt'];

      Object.entries<any>(row).forEach(([key, value]) => {
        if (ignoreColumns.includes(key)) return;

        // Faculty columns
        if (key.match(/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/)) {
          res[key] = value.actual ?? 0;
          return;
        }

        res[key] = value;
      });

      return res;
    });

    const header = [
      'idx',
      'moduleId',
      'moduleName',
      'method',
      'startAt',
      '_shift',
      'faculty',
      'roomsCount',
      'invigilatorsCount',
      ...faculties.map((f) => f.id),
      'total',
      'difference',
    ];

    const headerRow = {
      idx: 'STT',
      moduleId: 'Mã HP',
      moduleName: 'Tên HP',
      method: 'Hình thức',
      startAt: 'Ngày thi',
      _shift: 'Ca thi',
      faculty: 'Khoa CN',
      roomsCount: 'Số phòng',
      invigilatorsCount: 'Số CBCT',
      ...faculties.reduce<Record<string, string>>((acc, curr) => {
        acc[curr.id] = curr.name;
        return acc;
      }, {}),
      total: 'Tổng số',
      difference: 'Chênh lệch',
    };

    const ws = utils.json_to_sheet([headerRow, ...data], {
      header,
      skipHeader: true,
    });
    if (ws['!cols']) {
      ws['!cols'][1] = { width: 0.4 };
      ws['!cols'][2] = { width: 0.9 };
      ws['!cols'][3] = { width: 3 };
      ws['!cols'][4] = { width: 1 };
      ws['!cols'][5] = { width: 1.5 };
      ws['!cols'][6] = { width: 0.6 };
      ws['!cols'][7] = { width: 2 };
      ws['!cols'][8] = { width: 0.75 };
    }

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFileXLSX(wb, 'test1.xlsx');
  }
}
