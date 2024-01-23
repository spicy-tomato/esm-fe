import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ESMDomainEnumsExaminationStatus, ExaminationService } from '@esm/api';
import { ObservableHelper, Status } from '@esm/cdk';
import { AppApiAction, AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExaminationEditFinishExaminationState = {
  status: Status;
  error: string | null;
};

@Injectable()
export class ExaminationEditFinishExaminationStore extends ComponentStore<ExaminationEditFinishExaminationState> {
  // INJECT PROPERTIES
  private readonly router = inject(Router);
  private readonly appStore = inject(Store<AppState>);
  private readonly examinationService = inject(ExaminationService);

  // STATE SELECTORS
  readonly status$ = this.select((s) => s.status);

  // GLOBAL SELECTORS
  readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(takeUntil(this.destroy$));

  // EFFECTS
  readonly finish = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      withLatestFrom(this.examination$.pipe(ObservableHelper.filterNullish())),
      switchMap(([_, { id }]) =>
        this.examinationService
          .changeStatus(id, {
            status: ESMDomainEnumsExaminationStatus.Closed,
            createdAt: new Date(),
          })
          .pipe(
            tapResponse(
              () => {
                this.patchState({ status: 'success' });
                this.appStore.dispatch(AppApiAction.closeSuccessful());
              },
              (error) =>
                this.patchState({
                  status: 'error',
                  error: error as string,
                }),
            ),
          ),
      ),
    ),
  );

  // CONSTRUCTOR
  constructor() {
    super({
      status: 'idle',
      error: null,
    });
  }
}
