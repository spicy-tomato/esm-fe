import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { ExaminationShiftSimple } from '@esm/data';
import { tap } from 'rxjs';
import { ExaminationDataTableStore } from './table.store';

const FormFieldList = [
  'id',
  'candidatesCount',
  'invigilatorsCount',
  'startAt',
  'room',
  'examinationShiftGroup',
] as const;
type FormFieldTuple = typeof FormFieldList;
type FormFields = FormFieldTuple[number];

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
      FormGroup<{ [F in FormFields]: FormControl<ExaminationShiftSimple[F]> }>
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
  readonly status$ = this.store.status$;

  // PRIVATE PROPERTIES
  private readonly data$ = this.store.data$;

  // CONSTRUCTOR
  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly store: ExaminationDataTableStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.handleDataChanges();
    this.store.getData();
  }

  // PUBLIC METHODS
  get formControl(): FormArray {
    return this.form.controls.data;
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
            FormFieldList.reduce((acc, curr) => {
              acc[curr] = [row[curr]] as never;
              return acc;
            }, {} as { [F in FormFields]: ExaminationShiftSimple[F] })
          )
        )
      ),
    });
  }
}
