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
  Validators,
} from '@angular/forms';
import { ExaminationShiftSimple } from '@esm/data';
import {
  TuiAlertService,
  tuiButtonOptionsProvider,
  TuiNotification,
} from '@taiga-ui/core';
import { combineLatest, filter, map, switchMap, tap } from 'rxjs';
import { ExaminationExamStore } from './exam.store';

@Component({
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExaminationExamStore, tuiButtonOptionsProvider({ size: 'm' })],
})
export class ExaminationExamComponent implements OnInit {
  // PUBLIC PROPERTIES
  form!: FormGroup<{
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
  readonly data$ = this.store.data$;
  readonly showLoader$ = combineLatest([
    this.store.dataStatus$,
    this.store.updateStatus$,
  ]).pipe(map((statuses) => statuses.includes('loading')));

  // PRIVATE PROPERTIES
  readonly updateStatus$ = this.store.updateStatus$;

  // CONSTRUCTOR
  constructor(
    private readonly fb: NonNullableFormBuilder,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private readonly store: ExaminationExamStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.handleDataChanges();
    this.handleUpdateSuccess();
    this.store.getData();
  }

  // PUBLIC METHODS
  examsCountControl(index: number): FormControl{
    return this.form.controls.data.controls.at(index) as FormControl
  }
  
  save(): void {
    this.store.save(this.form.controls.data.value);
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

  private buildForm(data: ExaminationShiftSimple[]): void {
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
