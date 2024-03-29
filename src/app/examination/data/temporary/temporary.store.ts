import { inject, Injectable } from '@angular/core';
import { ObservableHelper, State, Status } from '@esm/cdk';
import { ExaminationStatus, TemporaryExamination } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { AppPageAction, AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

type ExaminationDataTemporaryState = State<TemporaryExamination[], 'data'> & {
  activateStatus: Status;
};

@Injectable()
export class ExaminationDataTemporaryStore extends ComponentStore<ExaminationDataTemporaryState> {
  // INJECT PROPERTIES
  private readonly examinationService = inject(ExaminationService);
  private readonly appStore = inject(Store<AppState>);

  // STATE SELECTORS
  readonly data$ = this.select((s) => s.data);

  private readonly dataStatus$ = this.select((s) => s.dataStatus);
  private readonly activateStatus$ = this.select((s) => s.activateStatus);

  // GLOBAL SELECTORS
  private readonly examinationId$ = this.appStore
    .select(AppSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  private readonly hasError$ = this.select(
    (s) => !!s.data.find((d) => Object.keys(d.errors).length > 0)
  );

  readonly headerObservables$ = combineLatest([
    this.dataStatus$,
    this.hasError$,
    this.activateStatus$,
  ]).pipe(
    map(([dataStatus, hasError, activateStatus]) => ({
      dataStatus,
      hasError,
      activateStatus,
    }))
  );

  // EFFECTS
  readonly activate = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ activateStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService
          .changeStatus(id, {
            status: ExaminationStatus.AssignFaculty,
            createdAt: new Date(),
          })
          .pipe(
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
        this.examinationService.getTemporaryData(id).pipe(
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
  constructor() {
    super({
      data: [],
      dataStatus: 'loading',
      dataError: null,
      activateStatus: 'idle',
    });
  }
}
