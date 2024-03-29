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
import { ExaminationStatus } from '@esm/data';
import { MinimumExaminationStatusDirective } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiDayRange, TuiDestroyService } from '@taiga-ui/cdk';
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
import { takeUntil, tap } from 'rxjs';
import { ExaminationExamStore } from '../exam.store';

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
    TAIGA_UI,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class ExaminationExamHeaderComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroy$ = inject(TuiDestroyService);
  private readonly store = inject(ExaminationExamStore);

  // OUTPUTS
  @Output()
  save = new EventEmitter<void>();

  // PUBLIC PROPERTIES
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
  readonly headerObs$ = this.store.headerObs$;

  // LIFECYCLE
  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        tap(() => {
          const filter = this.form.getRawValue();
          this.store.patchState({ filter });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
