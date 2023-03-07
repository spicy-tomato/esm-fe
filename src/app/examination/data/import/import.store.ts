import { Injectable } from '@angular/core';
import { ObservableHelper, Status } from '@esm/cdk';
import { ExaminationService } from '@esm/services';
import { AppPageAction, AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Subject, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExaminationDataImportState = {
  status: Status;
};

@Injectable()
export class ExaminationDataImportStore extends ComponentStore<ExaminationDataImportState> {
  // PUBLIC PROPERTIES
  readonly status$ = this.select((s) => s.status);
  readonly reload$ = new Subject<void>();

  // PRIVATE PROPERTIES
  private readonly examinationId$ = this.appStore
    .select(AppSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // EFFECTS
  readonly import = this.effect<FormData>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(([formData, id]) =>
        this.examinationService.import(id, formData).pipe(
          tapResponse(
            ({ data: success }) => {
              if (!success) {
                throw new Error();
              }
              this.patchState({ status: 'success' });
            },
            () => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  readonly clearRejected = this.effect<void>((params$) =>
    params$.pipe(tap(() => this.patchState({ status: 'idle' })))
  );

  // CONSTRUCTOR
  constructor(
    private readonly examinationService: ExaminationService,
    private readonly appStore: Store<AppState>
  ) {
    super({
      status: 'idle',
    });

    this.handleImportSuccess();
  }

  // PUBLIC METHODS
  reloadExamination(): void {
    this.reload$.next();
  }

  // PRIVATE METHODS
  private handleImportSuccess(): void {
    this.reload$
      .pipe(
        withLatestFrom(this.examinationId$),
        tap(({ 1: id }) => {
          this.appStore.dispatch(AppPageAction.getExaminationSummary({ id }));
        })
      )
      .subscribe();
  }
}
