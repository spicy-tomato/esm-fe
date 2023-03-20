import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ExamMethodPipe } from '@esm/core';
import { TemporaryExamination } from '@esm/data';
import { ErrorFlagComponent } from '@esm/shared/components';
import {
  AddModuleDialogComponent,
  AddRoomDialogComponent,
} from '@esm/shared/dialogs';
import { VarDirective } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogService,
  TuiDropdownModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { ExaminationDataTemporaryTableStore } from './temporary-table.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiInputNumberModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTableModule,
];

@Component({
  selector: 'esm-examination-data-temporary-table',
  templateUrl: './temporary-table.component.html',
  styleUrls: ['./temporary-table.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VarDirective,
    ExamMethodPipe,
    ScrollingModule,
    ErrorFlagComponent,
    ...NGRX,
    ...TAIGA_UI,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExaminationDataTemporaryTableStore],
})
export class ExaminationDataTemporaryTableComponent implements OnInit {
  // PUBLIC PROPERTIES
  form!: FormGroup<{
    data: FormArray<
      FormGroup<{
        [K in keyof TemporaryExamination]: FormControl<TemporaryExamination[K]>;
      }>
    >;
  }>;
  disableReload = true;
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
    'candidatesCount',
    'roomsCount',
    'rooms',
    'faculty',
    'department',
    'departmentAssign',
  ];
  readonly dataStatus$ = this.store.dataStatus$;
  readonly activateStatus$ = this.store.activateStatus$;
  readonly hasError$ = this.store.hasError$;

  // PRIVATE PROPERTIES
  private readonly data$ = this.store.data$;

  // CONSTRUCTOR
  constructor(
    private readonly fb: FormBuilder,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly store: ExaminationDataTemporaryTableStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.handleDataChanges();
    this.getData();
  }

  // PUBLIC METHODS
  get formControl(): FormArray {
    return this.form.controls['data'] as FormArray;
  }

  activate(): void {
    this.store.activate();
  }

  getData(): void {
    this.store.getData();
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
        tap(() => this.markLoadable())
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
        tap(() => this.markLoadable())
      )
      .subscribe();
  }

  // PRIVATE METHODS
  private handleDataChanges(): void {
    this.data$.pipe(tap((data) => this.buildForm(data))).subscribe();
  }

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

  private markLoadable(): void {
    this.disableReload = false;
  }
}
