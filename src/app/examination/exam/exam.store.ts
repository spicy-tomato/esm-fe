import { Injectable } from '@angular/core';
import { Status } from '@esm/cdk';
import { ObservableHelper } from '@esm/core';
import { ExaminationShiftSimple } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExaminationExamState = {
  data: ExaminationShiftSimple[];
  dataStatus: Status;
  updateStatus: Status;
};

@Injectable()
export class ExaminationExamStore extends ComponentStore<ExaminationExamState> {
  // PUBLIC PROPERTIES
  readonly data$ = this.select((s) => s.data);
  readonly dataStatus$ = this.select((s) => s.dataStatus);
  readonly updateStatus$ = this.select((s) => s.updateStatus);

  // PRIVATE PROPERTIES
  private readonly examinationId$ = this.appStore
    .select(AppSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // EFFECTS
  readonly getData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService.getData(id, true).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                data,
                dataStatus: 'success',
              }),
            () => this.patchState({ dataStatus: 'error' })
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
              this.getData();
            },
            () => this.patchState({ updateStatus: 'error' })
          )
        );
      })
    )
  );

  // CONSTRUCTOR
  constructor(
    private readonly examinationService: ExaminationService,
    private readonly appStore: Store<AppState>
  ) {
    super({
      data: [],
      dataStatus: 'loading',
      updateStatus: 'idle',
    });
  }
}
