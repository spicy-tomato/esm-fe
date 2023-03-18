import { Injectable } from '@angular/core';
import { ObservableHelper, Status } from '@esm/cdk';
import {
  AssignInvigilatorsToShiftsRequest,
  ExaminationGetShiftResponseItem,
  GetAvailableInvigilatorsInShiftGroupResponseItem,
} from '@esm/data';
import { ExaminationService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

export type ShiftUiModel = Omit<
  ExaminationGetShiftResponseItem,
  'invigilatorShift' | 'id'
> &
  ExaminationGetShiftResponseItem['invigilatorShift'][number];

type InvigilatorAssignRoomState = {
  data: ShiftUiModel[];
  dataStatus: Status;
  //
  invigilatorsData: GetAvailableInvigilatorsInShiftGroupResponseItem;
  invigilatorsDataStatus: Status;
  //
  updateStatus: Status;
  //
  autoAssignStatus: Status;
};

@Injectable()
export class InvigilatorAssignRoomStore extends ComponentStore<InvigilatorAssignRoomState> {
  // PUBLIC PROPERTIES
  readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(takeUntil(this.destroy$));
  readonly data$ = this.select((s) => s.data);
  readonly dataStatus$ = this.select((s) => s.dataStatus);
  readonly invigilatorsData$ = this.select((s) => s.invigilatorsData);
  readonly updateStatus$ = this.select((s) => s.updateStatus);
  readonly autoAssignStatus$ = this.select((s) => s.autoAssignStatus);

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
        this.examinationService.getShifts(id).pipe(
          tapResponse(
            ({ data }) => {
              this.patchState({
                data: data.reduce<ShiftUiModel[]>((acc, curr) => {
                  curr.invigilatorShift.forEach((s) => {
                    acc.push({ ...curr, ...s });
                  });
                  return acc;
                }, []),
                dataStatus: 'success',
              });
            },
            () => this.patchState({ dataStatus: 'error' })
          )
        )
      )
    )
  );

  readonly getInvigilatorsData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ invigilatorsDataStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService.getAvailableInvigilatorsInShiftGroup(id).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                invigilatorsData: data,
                invigilatorsDataStatus: 'success',
              }),
            () => this.patchState({ invigilatorsDataStatus: 'error' })
          )
        )
      )
    )
  );

  readonly autoAssign = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ autoAssignStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) =>
        this.examinationService.autoAssignTeacherToShifts(id).pipe(
          tapResponse(
            () => {
              this.patchState({ autoAssignStatus: 'success' });
              this.getData();
            },
            () => this.patchState({ autoAssignStatus: 'error' })
          )
        )
      )
    )
  );

  readonly save = this.effect<AssignInvigilatorsToShiftsRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ updateStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(([params, id]) =>
        this.examinationService.assignInvigilatorsToShifts(id, params).pipe(
          tapResponse(
            () => {
              this.patchState({ updateStatus: 'success' });
              this.getData();
            },
            () => this.patchState({ updateStatus: 'error' })
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
      invigilatorsData: {},
      invigilatorsDataStatus: 'loading',
      updateStatus: 'idle',
      autoAssignStatus: 'idle',
    });
  }
}
