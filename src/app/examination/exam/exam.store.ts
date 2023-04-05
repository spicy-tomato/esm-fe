import { inject, Injectable } from '@angular/core';
import { ObservableHelper, Status } from '@esm/cdk';
import { ExaminationGetDataResponseItem } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

type ExaminationExamState = {
  data: ExaminationGetDataResponseItem[];
  dataStatus: Status;
  updateStatus: Status;
};

@Injectable()
export class ExaminationExamStore extends ComponentStore<ExaminationExamState> {
  // INJECT PROPERTIES
  private readonly examinationService = inject(ExaminationService);
  private readonly appStore = inject(Store<AppState>);

  // PUBLIC PROPERTIES
  readonly user$ = this.appStore
    .select(AppSelector.user)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));
  readonly data$ = this.select((s) => s.data);
  readonly dataStatus$ = this.select((s) => s.dataStatus);
  readonly updateStatus$ = this.select((s) => s.updateStatus);

  // PRIVATE PROPERTIES
  private readonly examinationId$ = this.appStore
    .select(AppSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));
  private readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // EFFECTS
  readonly getData = this.effect<{ shift?: number[] }>((params$) =>
    combineLatest([
      params$.pipe(tap(() => this.patchState({ dataStatus: 'loading' }))),
      this.examination$,
    ]).pipe(
      withLatestFrom(this.examinationId$),
      filter(([{ 1: examination }, id]) => examination.id === id),
      switchMap(([[{ shift }], id]) =>
        this.examinationService
          .getData(id, { departmentAssign: false, shift })
          .pipe(
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
      withLatestFrom(this.data$, this.examinationId$),
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
              this.getData({});
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
    });
  }
}
