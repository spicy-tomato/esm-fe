import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiButtonModule, TuiScrollbarModule } from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExamMethodPipe } from '@esm/core';
import { ExaminationGetDataResponseItem } from '@esm/data';
import { filter, tap, withLatestFrom } from 'rxjs';
import { ExaminationExamStore } from '../exam.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiInputNumberModule,
  TuiScrollbarModule,
  TuiTableModule,
];

@Component({
  selector: 'esm-examination-exam-table',
  standalone: true,
  imports: [
    CommonModule,
    ExamMethodPipe,
    ReactiveFormsModule,
    ScrollingModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExaminationExamTableComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(ExaminationExamStore);

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
    'invigilatorsCount',
    'candidatesCount',
    'examsCount',
  ];
  readonly data$ = this.store.displayData$;
  readonly tableFormIsPristine$ = this.store.tableFormIsPristine$;

  form?: FormGroup<{
    data: FormArray<FormControl<number>>;
  }>;

  ngOnInit(): void {
    this.handleDataChanges();
  }

  examsCountControl(index: number): FormControl {
    return this.form?.controls.data.controls.at(index) as FormControl;
  }

  private handleDataChanges(): void {
    this.data$.pipe(tap((data) => this.buildForm(data))).subscribe();
  }

  private buildForm(data: ExaminationGetDataResponseItem[]): void {
    this.form = this.fb.group({
      data: this.fb.array(
        data.map((row) =>
          this.fb.control(row.examsCount, {
            validators: [Validators.required, Validators.min(0)],
          })
        )
      ),
    });

    this.form.valueChanges
      .pipe(
        withLatestFrom(this.tableFormIsPristine$),
        filter(({ 1: tableFormIsPristine }) => tableFormIsPristine),
        tap(() => this.store.patchState({ tableFormIsPristine: false }))
      )
      .subscribe();
  }

  save(): void {
    if (this.form) {
      this.store.save(this.form.controls.data.value);
    }
  }
}
