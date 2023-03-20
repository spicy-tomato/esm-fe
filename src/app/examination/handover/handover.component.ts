import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ObservableHelper } from '@esm/cdk';
import { GetHandoverDataResponseItem } from '@esm/data';
import { EditShiftReportComponent } from '@esm/shared/dialogs';
import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import { tuiButtonOptionsProvider, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { ExaminationHandoverStore } from './handover.store';

@Component({
  templateUrl: './handover.component.html',
  styleUrls: ['./handover.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ExaminationHandoverStore,
    tuiButtonOptionsProvider({
      appearance: 'secondary',
      size: 's',
    }),
  ],
})
export class ExaminationHandoverComponent implements OnInit {
  // PUBLIC PROPERTIES
  form?: FormGroup<{
    [key: string]: FormControl<string | null>;
  }>;
  readonly columns = [
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
  readonly dataStatus$ = this.store.dataStatus$;
  readonly handoverPersonStatus$ = this.store.handoverPersonStatus$;

  // CONSTRUCTOR
  constructor(
    private readonly fb: NonNullableFormBuilder,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly store: ExaminationHandoverStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.handleBuildForm();
    this.store.getData();
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
      map.get($implicit) || '';
  }

  onHandoverChanges(shiftId: string, handoverUserId: string): void {
    this.store.updateHandoverPerson({ shiftId, handoverUserId });
  }

  openDialog(data: GetHandoverDataResponseItem): void {
    this.dialogService
      .open<string | null>(
        new PolymorpheusComponent(EditShiftReportComponent, this.injector),
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
        tap((data) => this.buildForm(data))
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
