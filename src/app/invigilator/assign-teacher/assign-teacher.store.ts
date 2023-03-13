import { Injectable } from '@angular/core';
import { ObservableHelper, Status } from '@esm/cdk';
import {
  DepartmentShiftGroupSimple,
  UpdateTeacherAssignmentRequest,
  UserSummary,
} from '@esm/data';
import { ExaminationService, FacultyService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

type InvigilatorAssignTeacherState = {
  data: DepartmentShiftGroupSimple[];
  dataStatus: Status;
  //
  invigilatorsData: UserSummary[];
  invigilatorsDataStatus: Status;
  //
  updateStatus: Status;
};

@Injectable()
export class InvigilatorAssignTeacherStore extends ComponentStore<InvigilatorAssignTeacherState> {
  // PUBLIC PROPERTIES
  readonly faculty$ = this.appStore.pipe(
    AppSelector.notNullUser,
    map((u) => u.department!.faculty),
    takeUntil(this.destroy$)
  );
  readonly departmentsInFaculty$ = combineLatest([
    this.appStore.select(AppSelector.departmentsWithFaculty),
    this.faculty$,
  ]).pipe(
    map(([departments, currentFaculty]) =>
      departments.filter((d) => d.faculty?.id === currentFaculty?.id)
    )
  );
  readonly data$ = this.select((s) => s.data);
  readonly dataStatus$ = this.select((s) => s.dataStatus);
  readonly invigilatorsData$ = this.select((s) => s.invigilatorsData);
  readonly updateStatus$ = this.select((s) => s.updateStatus);

  // PRIVATE PROPERTIES
  private readonly examinationId$ = this.appStore
    .select(AppSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // EFFECTS
  readonly getData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading' })),
      withLatestFrom(
        this.examinationId$,
        this.faculty$.pipe(
          ObservableHelper.filterNullish(),
          map((f) => f.id)
        )
      ),
      switchMap(({ 1: id, 2: facultyId }) =>
        this.examinationService.getGroupsByFacultyId(id, facultyId).pipe(
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

  readonly getInvigilatorsData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ invigilatorsDataStatus: 'loading' })),
      withLatestFrom(
        this.faculty$.pipe(
          ObservableHelper.filterNullish(),
          map((f) => f.id)
        )
      ),
      switchMap(({ 1: facultyId }) =>
        this.facultyService.getUsers(facultyId).pipe(
          tapResponse(
            ({ data: invigilatorsData }) =>
              this.patchState({
                invigilatorsData,
                invigilatorsDataStatus: 'success',
              }),
            () => this.patchState({ invigilatorsDataStatus: 'error' })
          )
        )
      )
    )
  );

  readonly save = this.effect<UpdateTeacherAssignmentRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ updateStatus: 'loading' })),
      withLatestFrom(
        this.examinationId$,
        this.faculty$.pipe(
          ObservableHelper.filterNullish(),
          map((f) => f.id)
        )
      ),
      switchMap(([params, id, facultyId]) =>
        this.examinationService
          .updateTeacherAssignment(id, facultyId, params)
          .pipe(
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
    private readonly facultyService: FacultyService,
    private readonly appStore: Store<AppState>
  ) {
    super({
      data: [],
      dataStatus: 'loading',
      invigilatorsData: [],
      invigilatorsDataStatus: 'loading',
      updateStatus: 'idle',
    });
  }
}
