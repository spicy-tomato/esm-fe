import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TemporaryExamination } from '@esm/data';
import {
  AddModuleDialogComponent,
  AddRoomDialogComponent,
} from '@esm/shared/dialogs';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'esm-examination-data-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExaminationDataTableComponent implements OnChanges {
  // INPUT
  @Input() temporaryExamination!: TemporaryExamination[];

  // OUTPUT
  @Output() readonly changes = new EventEmitter<void>();

  // PUBLIC PROPERTIES
  form!: FormGroup<{
    data: FormArray<
      FormGroup<{
        [K in keyof TemporaryExamination]: FormControl<TemporaryExamination[K]>;
      }>
    >;
  }>;
  readonly columns = [
    'index',
    'moduleId',
    'moduleName',
    'moduleClass',
    'credit',
    'method',
    'date',
    'startAt',
    'endAt',
    'shift',
    'candidateCount',
    'roomsCount',
    'rooms',
    'faculty',
    'department',
    'departmentAssign',
  ];

  // CONSTRUCTOR
  constructor(
    private readonly fb: FormBuilder,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  // LIFECYCLE
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['temporaryExamination']) {
      this.buildForm(changes['temporaryExamination'].currentValue);
    }
  }

  // PUBLIC METHODS
  get formControl(): FormArray {
    return this.form.controls['data'] as FormArray;
  }

  onAddModule(rowId: number): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(AddModuleDialogComponent, this.injector),
        {
          data: this.form.value.data?.[rowId],
        }
      )
      .pipe(
        filter((x) => x),
        tap(() => this.changes.emit())
      )
      .subscribe();
  }

  onAddRoom(rowId: number): void {
    const errorRooms = this.form.value.data?.[rowId].errors?.rooms.data;
    if (!errorRooms) {
      return;
    }

    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(AddRoomDialogComponent, this.injector),
        {
          data: errorRooms,
        }
      )
      .pipe(
        filter((x) => x),
        tap(() => this.changes.emit())
      )
      .subscribe();
  }

  // PRIVATE METHODS
  private buildForm(data: TemporaryExamination[]): void {
    this.form = this.fb.group({
      data: this.fb.array(
        data.map((row) =>
          this.fb.group(
            Object.entries(row).reduce((acc, [key, value]) => {
              acc[key as keyof TemporaryExamination] = [value as any];
              return acc;
            }, {} as Record<keyof TemporaryExamination, any[]>)
          )
        )
      ),
    }) as any;
  }
}
