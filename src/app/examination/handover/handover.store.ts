import { inject, Injectable } from '@angular/core';
import { ObservableHelper, Status } from '@esm/cdk';
import { GetHandoverDataResponseItem } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type ExaminationHandoverState = {
  data: GetHandoverDataResponseItem[];
  dataStatus: Status;
  handoverPersonStatus: Record<string, Status>;
};

@Injectable()
export class ExaminationHandoverStore extends ComponentStore<ExaminationHandoverState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<AppState>);
  private readonly examinationService = inject(ExaminationService);

  // PUBLIC PROPERTIES
  readonly data$ = this.select((s) => s.data);
  readonly dataStatus$ = this.select((s) => s.dataStatus);
  readonly handoverPersonStatus$ = this.select((s) => s.handoverPersonStatus);

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
        this.examinationService.getHandoverData(id).pipe(
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

  readonly updateHandoverPerson = this.effect<{
    shiftId: string;
    handoverUserId: string;
  }>((params$) =>
    params$.pipe(
      tap(({ shiftId }) =>
        this.patchState((s) => ({
          handoverPersonStatus: {
            ...s.handoverPersonStatus,
            [shiftId]: 'loading',
          },
        }))
      ),
      withLatestFrom(this.examinationId$),
      switchMap(([{ shiftId, handoverUserId }, examinationId]) =>
        this.examinationService
          .updateShift(examinationId, shiftId, { handoverUserId })
          .pipe(
            tapResponse(
              () =>
                this.patchState((s) => ({
                  data: s.data.map((d) =>
                    d.id === shiftId
                      ? {
                          ...d,
                          handedOverUserId: handoverUserId,
                        }
                      : d
                  ),
                  handoverPersonStatus: {
                    ...s.handoverPersonStatus,
                    [shiftId]: 'success',
                  },
                })),
              () => this.patchState({ dataStatus: 'error' })
            )
          )
      )
    )
  );

  readonly updateHandoverReport = this.effect<{
    shiftId: string;
    reportContent: string;
  }>((params$) =>
    params$.pipe(
      tap(({ shiftId, reportContent }) => {
        this.patchState((state) => ({
          data: state.data.map((d) =>
            d.id === shiftId
              ? {
                  ...d,
                  report: reportContent,
                }
              : d
          ),
        }));
      })
    )
  );

  // CONSTRUCTOR
  constructor() {
    super({
      data: [],
      dataStatus: 'loading',
      handoverPersonStatus: {},
    });
  }
}
