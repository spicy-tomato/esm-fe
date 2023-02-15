import { Injectable } from '@angular/core';
import { Status } from '@esm/cdk';
import { ExaminationSummary } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs';

type TopBarState = {
  relatedExaminations: ExaminationSummary[];
  status: Status;
  error: string | null;
};

@Injectable()
export class TopBarStore extends ComponentStore<TopBarState> {
  // PROPERTIES
  readonly relatedStatus$ = this.select((s) => s.status);
  readonly relatedExaminations$ = this.select((s) => s.relatedExaminations);
  readonly examinationStatus$ = this.store.select(AppSelector.examinationStatus);
  readonly examination$ = this.store.select(AppSelector.examination);

  // EFFECTS
  readonly getRelatedExaminations = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap(() =>
        this.examinationService.getRelated(true).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                relatedExaminations: data,
                status: 'success',
                error: null,
              }),
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
  constructor(
    private readonly examinationService: ExaminationService,
    private readonly store: Store<AppState>
  ) {
    super({
      relatedExaminations: [],
      status: 'idle',
      error: null,
    });
  }
}
