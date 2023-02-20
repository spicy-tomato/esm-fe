import { Injectable } from '@angular/core';
import { Status } from '@esm/cdk';
import { ObservableHelper } from '@esm/core';
import { TemporaryExamination } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExaminationDataState = {
  data: TemporaryExamination[];
  dataStatus: Status;
  dataError: string | null;
  uploadStatus: Status;
  uploadError: string | null;
};

@Injectable()
export class ExaminationDataStore extends ComponentStore<ExaminationDataState> {
  // PUBLIC PROPERTIES
  readonly data$ = this.select((s) => s.data);
  readonly dataStatus$ = this.select((s) => s.dataStatus);
  readonly uploadStatus$ = this.select((s) => s.uploadStatus);
  readonly uploadError$ = this.select((s) => s.uploadError);

  // PRIVATE PROPERTIES
  private readonly examinationId$ = this.appStore
    .select(AppSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // EFFECTS
  readonly import = this.effect<FormData>((params$) =>
    params$.pipe(
      tap(() =>
        this.patchState({ uploadStatus: 'loading', uploadError: null })
      ),
      withLatestFrom(this.examinationId$),
      switchMap(([formData, id]) =>
        this.examinationService.import(id, formData).pipe(
          tapResponse(
            ({ data: success }) => {
              if (!success) {
                throw new Error();
              }
              this.patchState({ uploadStatus: 'success' });
            },
            (error) =>
              this.patchState({
                uploadStatus: 'error',
                uploadError: error as string,
              })
          )
        )
      )
    )
  );

  readonly getData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() =>
        this.patchState({ dataStatus: 'loading', dataError: null })
      ),
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

  readonly clearRejected = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ uploadStatus: 'idle', uploadError: null }))
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
      uploadStatus: 'idle',
      uploadError: null,
    });
  }
}
