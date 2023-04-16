import { inject, Injectable } from '@angular/core';
import { ObservableHelper, Status } from '@esm/cdk';
import { ExaminationGetDataResponseItem } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { shiftFilterObservable } from '@esm/shared/observables';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { TuiDayRange } from '@taiga-ui/cdk';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExaminationDataFinalState = {
  data: ExaminationGetDataResponseItem[];
  status: Status;
  filter: {
    methods: number[];
    date: TuiDayRange | null;
    shifts: number[];
  };
};

@Injectable()
export class ExaminationDataFinalStore extends ComponentStore<ExaminationDataFinalState> {
  // INJECT PROPERTIES
  private readonly examinationService = inject(ExaminationService);
  private readonly appStore = inject(Store<AppState>);

  // PUBLIC PROPERTIES
  readonly data$ = this.select((s) => s.data);
  private readonly filter$ = this.select((s) => s.filter);
  readonly displayData$ = shiftFilterObservable(this.data$, this.filter$);
  readonly status$ = this.select((s) => s.status);

  // PRIVATE PROPERTIES
  private readonly examinationId$ = this.appStore
    .select(AppSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // EFFECTS
  readonly getData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService.getData(id).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                data,
                status: 'success',
              }),
            () => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  // CONSTRUCTOR
  constructor() {
    super({
      data: [],
      status: 'loading',
      filter: {
        methods: [],
        date: null,
        shifts: [],
      },
    });
  }
}
