import { Injectable } from '@angular/core';
import { Status } from '@esm/cdk';
import { ObservableHelper } from '@esm/core';
import { ExaminationShiftSimple } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { AppPageAction, AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExaminationDataTableState = {
  data: ExaminationShiftSimple[];
  dataStatus: Status;
  dataError: string | null;
  //
  activateStatus: Status;
};

@Injectable()
export class ExaminationDataTableStore extends ComponentStore<ExaminationDataTableState> {
  // PUBLIC PROPERTIES
  readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(takeUntil(this.destroy$));
  readonly data$ = this.select((s) => s.data);
  readonly dataStatus$ = this.select((s) => s.dataStatus);
  readonly activateStatus$ = this.select((s) => s.activateStatus);

  // PRIVATE PROPERTIES
  private readonly examinationId$ = this.appStore
    .select(AppSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // EFFECTS
  readonly activate = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ activateStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService.activate(id).pipe(
          tapResponse(
            () => {
              this.patchState({ activateStatus: 'success' });
              this.appStore.dispatch(
                AppPageAction.getExaminationSummary({ id })
              );
            },
            () => this.patchState({ activateStatus: 'error' })
          )
        )
      )
    )
  );

  readonly getData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading', dataError: null })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService.getData(id).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                data,
                dataStatus: 'success',
                dataError: null,
              }),
            (error) =>
              this.patchState({
                dataStatus: 'error',
                dataError: error as string,
              })
          )
        )
      )
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
      dataError: null,
      activateStatus: 'idle',
    });
  }
}
