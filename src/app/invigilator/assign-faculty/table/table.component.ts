import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
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
import { ArrayPipe, ExamMethodPipe } from '@esm/core';
import {
  ExaminationStatus,
  FacultySummary,
  GetAllGroupsResponseResponseItem,
} from '@esm/data';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiScrollbarModule, TuiTooltipModule } from '@taiga-ui/core';
import { TuiInputNumberComponent, TuiInputNumberModule } from '@taiga-ui/kit';
import { InvigilatorAssignFacultyStore } from '../assign-faculty.store';
import { combineLatest, tap } from 'rxjs';

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
})
export class InvigilatorAssignFacultyTableComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(InvigilatorAssignFacultyStore);

  @ViewChild('input') input!: TuiInputNumberComponent;

  form!: FormGroup;
  inputValue = 0;
  inputOldValue = 0;
  inputStyle: InputStyle | null = null;
  focusedControl: FormControl | null = null;
  focusedCellData: FocusedCellData | null = null;

  readonly ExaminationStatus = ExaminationStatus;
  readonly tableObservables$ = this.store.tableObservables$;

  private readonly data$ = this.store.data$;
  private readonly faculties$ = this.store.faculties$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleBuildForm();
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
}
