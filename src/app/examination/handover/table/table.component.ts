import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ObservableHelper } from '@esm/cdk';
import { ExamMethodPipe } from '@esm/core';
import { ExaminationStatus, GetHandoverDataResponseItem } from '@esm/data';
import { EditShiftReportDialogComponent } from '@esm/shared/dialogs';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiContextWithImplicit,
  TuiStringHandler,
  tuiPure,
} from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogService,
  TuiLoaderModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { ExaminationHandoverStore } from '../handover.store';

export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSelectModule,
  TuiTableModule,
];

@Component({
  selector: 'esm-examination-handover-table',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExamMethodPipe,
    ScrollingModule,
    EditShiftReportDialogComponent,
    LetModule,
    TAIGA_UI,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExaminationHandoverTableComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly store = inject(ExaminationHandoverStore);
  private readonly injector = inject(Injector);
  private readonly dialogService = inject(TuiDialogService);

  // PUBLIC PROPERTIES
  form?: FormGroup<{
    [key: string]: FormControl<string | null>;
  }>;

  readonly ExaminationStatus = ExaminationStatus;
  readonly columns = [
    'index',
    'moduleId',
    'moduleName',
    'method',
    'date',
    'startAt',
    'shift',
    'room',
    'handover',
    'report',
  ];

  readonly data$ = this.store.data$;
  readonly tableObservables$ = this.store.tableObservables$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleBuildForm();
  }

  // PUBLIC METHODS
  @tuiPure
  invigilatorStringify(
    items: GetHandoverDataResponseItem['invigilatorShift']
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(
      items.map(
        ({ invigilator }) =>
          [invigilator?.id, invigilator?.fullName] as [string, string]
      )
    );

    return ({ $implicit }: TuiContextWithImplicit<string>) =>
      map.get($implicit) ?? '';
  }

  onHandoverChanges(shiftId: string, handoverUserId: string): void {
    this.store.updateHandoverPerson({ shiftId, handoverUserId });
  }

  openDialog(data: GetHandoverDataResponseItem): void {
    this.dialogService
      .open<string | null>(
        new PolymorpheusComponent(
          EditShiftReportDialogComponent,
          this.injector
        ),
        { data }
      )
      .pipe(
        ObservableHelper.filterNullish(),
        tap((reportContent) =>
          this.store.updateHandoverReport({ shiftId: data.id, reportContent })
        )
      )
      .subscribe();
  }

  // PRIVATE METHODS
  private handleBuildForm(): void {
    this.data$
      .pipe(
        filter((data) => !!data.length),
        tap((data) => {
          this.buildForm(data);
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  private buildForm(data: GetHandoverDataResponseItem[]): void {
    this.form = this.fb.group(
      data.reduce((acc, curr) => {
        acc[curr.id] = [curr.handedOverUserId];
        return acc;
      }, {} as Record<string, (string | null)[]>)
    );
  }
}
