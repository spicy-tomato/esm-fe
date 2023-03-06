import { Injectable } from '@angular/core';
import { Status } from '@esm/cdk';
import { ObservableHelper } from '@esm/core';
import { ExaminationShiftGroupSimple, ExaminationStatus } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

type InvigilatorAssignFacultyState = {
  data: ExaminationShiftGroupSimple[];
  dataStatus: Status;
  calculateStatus: Status;
  updateRows: number[];
};

@Injectable()
export class InvigilatorAssignFacultyStore extends ComponentStore<InvigilatorAssignFacultyState> {
  // PUBLIC PROPERTIES
  readonly faculties$ = this.appStore
    .select(AppSelector.faculties)
    .pipe(takeUntil(this.destroy$));
  readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(takeUntil(this.destroy$));
  readonly data$ = this.select((s) => s.data);
  readonly dataStatus$ = this.select((s) => s.dataStatus);
  readonly calculateStatus$ = this.select((s) => s.calculateStatus);
  readonly updateRows$ = this.select((s) => s.updateRows);

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
        this.examinationService.getAllGroups(id).pipe(
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

  readonly calculate = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ calculateStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) => {
        return this.examinationService.calculate(id).pipe(
          tapResponse(
            () => {
              this.patchState({ calculateStatus: 'success' });
              this.getData();
            },
            () => this.patchState({ calculateStatus: 'error' })
          )
        );
      })
    )
  );

  readonly finishAssign = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ calculateStatus: 'loading' })),
      withLatestFrom(this.examinationId$),
      switchMap(({ 1: id }) => {
        return this.examinationService
          .changeStatus(id, ExaminationStatus.AssignInvigilator)
          .pipe(
            tapResponse(
              () => {
                this.patchState({ calculateStatus: 'success' });
                this.getData();
              },
              () => this.patchState({ calculateStatus: 'error' })
            )
          );
      })
    )
  );

  readonly save = this.effect<{
    rowId: number;
    facultyId: string;
    numberOfInvigilator: number;
  }>((params$) =>
    params$.pipe(
      tap(({ rowId }) =>
        this.patchState((s) => ({ updateRows: [...s.updateRows, rowId] }))
      ),
      withLatestFrom(this.data$, this.examinationId$),
      switchMap(([{ rowId, facultyId, numberOfInvigilator }, data, id]) => {
        return this.examinationService
          .assignInvigilatorNumerateOfShiftToFaculty(
            id,
            data[rowId].id,
            facultyId,
            numberOfInvigilator
          )
          .pipe(
            tapResponse(
              ({ data }) => {
                this.patchState((s) => ({
                  data: s.data.map((d, i) => (i !== rowId ? d : data)),
                  updateRows: s.updateRows.filter((r) => r !== rowId),
                }));
              },
              () => {}
            )
          );
      })
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
      calculateStatus: 'idle',
      updateRows: [],
    });
  }
}
