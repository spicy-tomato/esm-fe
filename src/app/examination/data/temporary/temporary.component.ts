import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
import { ESMDomainEntitiesExaminationData } from '@esm/api';
import { ExamMethodPipe } from '@esm/core';
import { ErrorFlagComponent } from '@esm/shared/components';
import {
  AddModuleDialogComponent,
  AddRoomDialogComponent,
} from '@esm/shared/dialogs';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogService,
  TuiDropdownDirective,
  TuiDropdownModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiInputNumberModule, TuiLineClampModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { ExaminationDataTemporaryStore } from './temporary.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiInputNumberModule,
  TuiLineClampModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTableModule,
];

type FormItemType = {
  [K in keyof ESMDomainEntitiesExaminationData]: FormControl<
    ESMDomainEntitiesExaminationData[K]
  >;
};

type FormType = {
  data: FormArray<FormGroup<FormItemType>>;
};

@Component({
  selector: 'esm-examination-data-temporary',
  templateUrl: './temporary.component.html',
  styleUrls: ['./temporary.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExamMethodPipe,
    ScrollingModule,
    ErrorFlagComponent,
    ...NGRX,
    ...TAIGA_UI,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExaminationDataTemporaryStore],
})
export class ExaminationDataTemporaryComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(FormBuilder);
  private readonly injector = inject(Injector);
  private readonly dialogService = inject(TuiDialogService);
  private readonly store = inject(ExaminationDataTemporaryStore);

  // PUBLIC PROPERTIES
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
  readonly headerObservables$ = this.store.headerObservables$;

  form!: FormGroup<FormType>;
  disableReload = true;

  // PRIVATE PROPERTIES
  private readonly data$ = this.store.data$;

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

  onAddModule(rowId: number, moduleIdDropdownHost: TuiDropdownDirective): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(AddModuleDialogComponent, this.injector),
        {
          data: this.form.value.data?.[rowId],
        },
      )
      .pipe(
        filter((x) => x),
        tap(() => this.markLoadable()),
      )
      .subscribe();
    moduleIdDropdownHost.toggle(false);
  }

  onAddRoom(rowId: number): void {
    const roomErrors = this.form.value.data?.[rowId].errors?.['rooms'];
    const roomErrorsData =
      roomErrors && 'data' in roomErrors ? roomErrors.data : null;
    if (!roomErrorsData) {
      return;
    }

    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(AddRoomDialogComponent, this.injector),
        {
          data: roomErrorsData,
        },
      )
      .pipe(
        filter((x) => x),
        tap(() => this.markLoadable()),
      )
      .subscribe();
  }

  // PRIVATE METHODS
  private handleDataChanges(): void {
    this.data$.pipe(tap((data) => this.buildForm(data))).subscribe();
  }

  private buildForm(data: ESMDomainEntitiesExaminationData[]): void {
    this.form = this.fb.group<FormType>({
      data: this.fb.array(
        data.map((row) =>
          this.fb.group(
            Object.entries(row).reduce((acc, [key, value]) => {
              acc[key as keyof FormItemType] = [value] as never;
              return acc;
            }, {} as FormItemType),
          ),
        ),
      ),
    });
  }

  private markLoadable(): void {
    this.disableReload = false;
  }
}
