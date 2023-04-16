import { inject, Injectable } from '@angular/core';
import { EsmHttpErrorResponse, ObservableHelper, Status } from '@esm/cdk';
import {
  GetGroupByFacultyIdResponseItem,
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
  data: GetGroupByFacultyIdResponseItem[];
  dataStatus: Status;
  dataError: any;
  //
  invigilatorsData: UserSummary[];
  invigilatorsDataStatus: Status;
  //
  invigilatorPhoneNumberMap: Record<string, string | null>;
  //
  updateStatus: Status;
  //
  autoAssignStatus: Status;
};

@Injectable()
export class InvigilatorAssignTeacherStore extends ComponentStore<InvigilatorAssignTeacherState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<AppState>);
  private readonly facultyService = inject(FacultyService);
  private readonly examinationService = inject(ExaminationService);

  // PUBLIC PROPERTIES
  readonly faculty$ = this.appStore.pipe(
    AppSelector.notNullUser,
    map((u) => u.department!.faculty),
    takeUntil(this.destroy$)
  );
  readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(takeUntil(this.destroy$));
  readonly departmentsInFaculty$ = combineLatest([
    this.appStore.select(AppSelector.departmentsWithFaculty),
    this.faculty$,
  ]).pipe(
    map(([departments, currentFaculty]) =>
      departments.filter((d) => d.faculty?.id === currentFaculty?.id)
    ),
    takeUntil(this.destroy$)
  );
  readonly data$ = this.select((s) => s.data);
  readonly dataError$ = this.select((s) => s.dataError);
  readonly dataStatus$ = this.select((s) => s.dataStatus);
  readonly invigilatorsData$ = this.select((s) => s.invigilatorsData);
  readonly invigilatorPhoneNumberMap$ = this.select(
    (s) => s.invigilatorPhoneNumberMap
  );
  readonly updateStatus$ = this.select((s) => s.updateStatus);
  readonly autoAssignStatus$ = this.select((s) => s.autoAssignStatus);

  // PRIVATE PROPERTIES
  private readonly examinationId$ = this.appStore
    .select(AppSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // EFFECTS
  readonly getData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ dataStatus: 'loading', dataError: null })),
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
            (e: EsmHttpErrorResponse) => {
              this.patchState({ dataStatus: 'error', dataError: e.error });
            }
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
                invigilatorPhoneNumberMap: invigilatorsData.reduce<
                  Record<string, string | null>
                >((acc, curr) => {
                  const { phoneNumber } = curr;
                  acc[curr.id] = phoneNumber;
                  return acc;
                }, {}),
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
      withLatestFrom(
        this.examinationId$,
        this.faculty$.pipe(
          ObservableHelper.filterNullish(),
          map((f) => f.id)
        )
      ),
      switchMap(([_, id, facultyId]) =>
        this.examinationService
          .autoAssignTeacherToShiftGroups(id, facultyId)
          .pipe(
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
  constructor() {
    super({
      data: [],
      dataStatus: 'loading',
      dataError: null,
      invigilatorsData: [],
      invigilatorsDataStatus: 'loading',
      invigilatorPhoneNumberMap: {},
      updateStatus: 'idle',
      autoAssignStatus: 'idle',
    });
  }
}
