import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ExamMethodPipe } from '@esm/core';
import { ExaminationGetDataResponseItem } from '@esm/data';
import { VarDirective } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiLoaderModule,
  TuiNotification,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { combineLatest, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { ExaminationExamStore } from './exam.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiInputNumberModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiTableModule,
];

@Component({
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExamMethodPipe,
    ScrollingModule,
    VarDirective,
    ...NGRX,
    ...TAIGA_UI,
  ],
  providers: [
    ExaminationExamStore,
    TuiDestroyService,
    tuiButtonOptionsProvider({ size: 'm' }),
  ],
})
export class ExaminationExamComponent implements OnInit {
  // PUBLIC PROPERTIES
  form?: FormGroup<{
    data: FormArray<FormControl<number>>;
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
    'invigilatorsCount',
    'candidatesCount',
    'examsCount',
  ];
  readonly user$ = this.store.user$;
  readonly data$ = this.store.data$;
  readonly showLoader$ = combineLatest([
    this.store.dataStatus$,
    this.store.updateStatus$,
  ]).pipe(map((statuses) => statuses.includes('loading')));

  // PRIVATE PROPERTIES
  readonly updateStatus$ = this.store.updateStatus$;

  // CONSTRUCTOR
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: NonNullableFormBuilder,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private readonly store: ExaminationExamStore,
    private readonly destroy$: TuiDestroyService
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.handleDataChanges();
    this.handleUpdateSuccess();
    this.store.getData();
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        tap(() => this.store.getData()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  // PUBLIC METHODS
  examsCountControl(index: number): FormControl {
    return this.form?.controls.data.controls.at(index) as FormControl;
  }

  save(): void {
    if (this.form) {
      this.store.save(this.form.controls.data.value);
    }
  }

  // PRIVATE METHODS
  private handleDataChanges(): void {
    this.data$.pipe(tap((data) => this.buildForm(data))).subscribe();
  }

  private handleUpdateSuccess(): void {
    this.updateStatus$
      .pipe(
        filter((s) => s === 'success'),
        switchMap(() =>
          this.alertService.open('Thêm học phần thành công!', {
            status: TuiNotification.Success,
          })
        )
      )
      .subscribe();
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
  }
}
