import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableHelper, Status } from '@esm/cdk';
import { CreateExaminationRequest, UpdateExaminationRequest } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { AppPageAction, AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExaminationEditState = {
  status: Status;
  error: string | null;
};

@Injectable()
export class ExaminationEditStore extends ComponentStore<ExaminationEditState> {
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
  readonly create = this.effect<CreateExaminationRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap((param) =>
        this.examinationService.create(param).pipe(
          tapResponse(
            ({ data }) => {
              this.router.navigateByUrl(`${data.id}/exam/data`);
            },
            (error) =>
              this.patchState({
                status: 'error',
                error: error as string,
              })
          )
        )
      )
    )
  );

  readonly update = this.effect<UpdateExaminationRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      withLatestFrom(this.examination$.pipe(ObservableHelper.filterNullish())),
      switchMap(([param, { id }]) =>
        this.examinationService.update(id, param).pipe(
          tapResponse(
            () => {
              this.patchState({ status: 'success' });
              this.appStore.dispatch(
                AppPageAction.updateExamination({ id, data: param })
              );
            },
            (error) =>
              this.patchState({
                status: 'error',
                error: error as string,
              })
          )
        )
      )
    )
  );

  // CONSTRUCTOR
  constructor() {
    super({
      status: 'idle',
      error: null,
    });
  }
}
