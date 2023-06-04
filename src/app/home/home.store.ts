import { inject, Injectable } from '@angular/core';
import { Status } from '@esm/cdk';
import { GetRelatedResponseItem } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap } from 'rxjs';

type HomeState = {
  closedExaminations: GetRelatedResponseItem[];
  closedExaminationsStatus: Status;
  closedExaminationsError: string | null;
};

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<AppState>);
  private readonly examinationService = inject(ExaminationService);

  // STATE SELECTORS
  readonly closedExaminations$ = this.select((s) => s.closedExaminations);
  readonly closedExaminationsStatus$ = this.select(
    (s) => s.closedExaminationsStatus
  );

  // GLOBAL SELECTORS
  readonly relatedStatus$ = this.appStore
    .select(AppSelector.relatedExaminationsStatus)
    .pipe(takeUntil(this.destroy$));
  readonly relatedExaminations$ = this.appStore
    .select(AppSelector.relatedExaminations)
    .pipe(takeUntil(this.destroy$));

  // EFFECTS
  readonly getClosedExaminations = this.effect<void>((params$) =>
    params$.pipe(
      tap(() =>
        this.patchState({
          closedExaminationsStatus: 'loading',
          closedExaminationsError: null,
        })
      ),
      switchMap(() =>
        this.examinationService.getRelated(false).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                closedExaminations: data,
                closedExaminationsStatus: 'success',
                closedExaminationsError: null,
              }),
            (error) =>
              this.patchState({
                closedExaminationsStatus: 'error',
                closedExaminationsError: error as string,
              })
          )
        )
      )
    )
  );

  // CONSTRUCTOR
  constructor() {
    super({
      closedExaminations: [],
      closedExaminationsStatus: 'idle',
      closedExaminationsError: null,
    });
  }
}
