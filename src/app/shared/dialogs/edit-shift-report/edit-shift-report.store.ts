import { inject, Injectable } from '@angular/core';
import {
  ErrorResult,
  EsmHttpErrorResponse,
  ObservableHelper,
  Status,
} from '@esm/cdk';
import { ExaminationService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type EditShiftReportDialogState = {
  status: Status;
  errors: ErrorResult[] | null;
};

@Injectable()
export class EditShiftReportDialogStore extends ComponentStore<EditShiftReportDialogState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<AppState>);
  private readonly examinationService = inject(ExaminationService);

  // PUBLIC PROPERTIES
  readonly examinationId$ = this.appStore
    .select(AppSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));
  readonly status$ = this.select((s) => s.status);
  readonly errors$ = this.select((s) => s.errors);

  // EFFECTS
  readonly update = this.effect<{
    shiftId: string;
    report: string;
  }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', errors: null })),
      withLatestFrom(this.examinationId$),
      switchMap(([{ shiftId, report }, examinationId]) =>
        this.examinationService
          .updateShift(examinationId, shiftId, { report })
          .pipe(
            tapResponse(
              () => this.patchState({ status: 'success' }),
              (res: EsmHttpErrorResponse) =>
                this.patchState({
                  status: 'error',
                  errors: res.error.errors,
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
      errors: null,
    });
  }
}
