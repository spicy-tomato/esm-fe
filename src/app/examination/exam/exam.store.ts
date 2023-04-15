import { inject, Injectable } from '@angular/core';
import { ObservableHelper, Status } from '@esm/cdk';
import { ExaminationGetDataResponseItem } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import {
  combineLatest,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

type ExaminationExamState = {
  data: ExaminationGetDataResponseItem[];
  dataStatus: Status;
  updateStatus: Status;
  tableFormIsPristine: boolean;
  filter: {
    methods: number[];
    date: TuiDayRange | null;
    shifts: number[];
  };
};

@Injectable()
export class ExaminationExamStore extends ComponentStore<ExaminationExamState> {
  // INJECT PROPERTIES
  private readonly examinationService = inject(ExaminationService);
  private readonly appStore = inject(Store<AppState>);

  // PUBLIC PROPERTIES
  readonly data$ = this.select((s) => s.data);
  private readonly filter$ = this.select((s) => s.filter);
  readonly displayData$ = combineLatest([this.data$, this.filter$]).pipe(
    map(([data, { methods, date, shifts }]) =>
      data.filter(({ shiftGroup }) => {
        const startAt = TuiDay.fromUtcNativeDate(new Date(shiftGroup.startAt));
        return (
          // method
          (methods.length === 0 ||
            (shiftGroup.shift && methods.includes(shiftGroup.method))) &&
          // date
          (!date ||
            (date.from.daySameOrBefore(startAt) &&
              startAt.daySameOrBefore(date.to))) &&
          // shift
          (shifts.length === 0 ||
            (shiftGroup.shift && shifts.includes(shiftGroup.shift)))
        );
      })
    )
  );

  readonly dataStatus$ = this.select((s) => s.dataStatus);
  readonly updateStatus$ = this.select((s) => s.updateStatus);
  readonly tableFormIsPristine$ = this.select((s) => s.tableFormIsPristine);

  // PRIVATE PROPERTIES
  private readonly examinationId$ = this.appStore
    .select(AppSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));
  private readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // EFFECTS
  readonly getData = this.effect<void>((params$) =>
    combineLatest([
      params$.pipe(tap(() => this.patchState({ dataStatus: 'loading' }))),
      this.examination$,
    ]).pipe(
      withLatestFrom(this.examinationId$),
      filter(([{ 1: examination }, id]) => examination.id === id),
      switchMap(([_, id]) =>
        this.examinationService.getData(id).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                data,
                dataStatus: 'success',
              }),
            () => this.patchState({ data: [], dataStatus: 'error' })
          )
        )
      )
    )
  );

  readonly save = this.effect<number[]>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ updateStatus: 'loading' })),
      withLatestFrom(this.displayData$, this.examinationId$),
      switchMap(([values, data, id]) => {
        const params = values.reduce((acc, curr, i) => {
          const shiftId = data[i].id;
          acc[shiftId] = curr;
          return acc;
        }, {} as Record<string, number>);

        return this.examinationService.updateExamsNumber(id, params).pipe(
          tapResponse(
            () => {
              this.patchState({ updateStatus: 'success' });
              this.getData();
            },
            () => this.patchState({ updateStatus: 'error' })
          )
        );
      })
    )
  );

  // CONSTRUCTOR
  constructor() {
    super({
      data: [],
      dataStatus: 'loading',
      updateStatus: 'idle',
      tableFormIsPristine: true,
      filter: {
        methods: [],
        date: null,
        shifts: [],
      },
    });
  }
}
