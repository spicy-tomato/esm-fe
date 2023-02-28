import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import {
  ExaminationShiftSimple,
  ExamMethod,
  ModuleSimple,
  RoomSummary,
  TemporaryExamination,
} from '@esm/data';
import { tap } from 'rxjs';
import { ExaminationDataTableStore } from './table.store';

@Component({
  selector: 'esm-examination-data-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExaminationDataTableStore],
})
export class ExaminationDataTemporaryTableComponent implements OnInit {
  // PUBLIC PROPERTIES
  form!: FormGroup<{
    data: FormArray<
      FormGroup<{
        id: FormControl<number>;
        method: FormControl<ExamMethod>;
        examsCount: FormControl<number>;
        startAt: FormControl<Date>;
        module: FormControl<ModuleSimple>;
        room: FormControl<RoomSummary>;
      }>
    >;
  }>;
  readonly columns = [
    'index',
    'moduleId',
    'moduleName',
    'credit',
    'method',
    'date',
    'startAt',
    'shift',
    'room',
    'candidatesCount',
    'departmentAssign',
  ];
  readonly dataStatus$ = this.store.dataStatus$;
  
  // PRIVATE PROPERTIES
  private readonly data$ = this.store.data$;

  // CONSTRUCTOR
  constructor(
    private readonly fb: FormBuilder,
    private readonly store: ExaminationDataTableStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.handleDataChanges();
    this.getData();
  }

  // PUBLIC METHODS
  get formControl(): FormArray {
    return this.form.controls.data;
  }

  activate(): void {
    this.store.activate();
  }

  getData(): void {
    this.store.getData();
  }

  // PRIVATE METHODS
  private handleDataChanges(): void {
    this.data$.pipe(tap((data) => this.buildForm(data))).subscribe();
  }

  private buildForm(data: ExaminationShiftSimple[]): void {
    this.form = this.fb.group({
      data: this.fb.array(
        data.map((row) =>
          this.fb.group(
            Object.entries(row).reduce((acc, [key, value]) => {
              acc[key as keyof ExaminationShiftSimple] = [value as any];
              return acc;
            }, {} as Record<keyof ExaminationShiftSimple, any[]>)
          )
        )
      ),
    });
  }
}
