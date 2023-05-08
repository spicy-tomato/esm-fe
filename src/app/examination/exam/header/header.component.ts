import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StringHelper } from '@esm/cdk';
import { ExamMethodPipe } from '@esm/core';
import { MinimumExaminationStatusDirective } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import {
  TUI_FIRST_DAY,
  TUI_LAST_DAY,
  TuiDay,
  TuiDayRange,
} from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiInputDateRangeModule,
  TuiMultiSelectModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { map, tap } from 'rxjs';
import { ExaminationExamStore } from '../exam.store';
import { ExaminationStatus } from '@esm/data';

export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiInputDateRangeModule,
  TuiMultiSelectModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'esm-examination-exam-header',
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    ReactiveFormsModule,
    PolymorpheusModule,
    ExamMethodPipe,
    MinimumExaminationStatusDirective,
    ...TAIGA_UI,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExaminationExamHeaderComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(ExaminationExamStore);

  @Output()
  save = new EventEmitter<void>();

  readonly ExaminationStatus = ExaminationStatus;
  readonly shifts = [1, 2, 3, 4];
  readonly methods = Object.keys(StringHelper.EXAM_METHOD_MAPPING).map(
    (k) => +k
  );
  readonly form = this.fb.group({
    methods: [[]],
    date: [null as TuiDayRange | null],
    shifts: [[]],
  });
  readonly shiftContentContext!: { $implicit: number[] };
  readonly methodContentContext!: { $implicit: number[] };

  readonly data$ = this.store.displayData$;
  readonly showLoader$ = this.store.showLoader$;
  readonly tableFormIsPristine$ = this.store.tableFormIsPristine$;
  readonly minMaxDate$ = this.store.data$.pipe(
    map((data) =>
      data.length
        ? {
            min: TuiDay.fromUtcNativeDate(new Date(data[0].shiftGroup.startAt)),
            max: TuiDay.fromUtcNativeDate(
              new Date(data[data.length - 1].shiftGroup.startAt)
            ),
          }
        : { min: TUI_FIRST_DAY, max: TUI_LAST_DAY }
    )
  );

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        tap(() => {
          const filter = this.form.getRawValue();
          this.store.patchState({ filter });
        })
      )
      .subscribe();
  }
}
