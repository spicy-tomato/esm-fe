import { inject, Injectable } from '@angular/core';
import { EsmHttpErrorResponse, ObservableHelper, Status } from '@esm/cdk';
import {
  DepartmentSummary,
  FacultySummary,
  GetGroupByFacultyIdResponseItem,
  UpdateTeacherAssignmentRequest,
  UserSummary,
} from '@esm/data';
import { ExaminationService, FacultyService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import {
  ComponentStore,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  map,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

type UserInfoMap = Record<
  string,
  null | { phoneNumber: string | null; department: DepartmentSummary | null }
>;

type InvigilatorAssignTeacherState = {
  //
  faculty: FacultySummary | null;
  data: GetGroupByFacultyIdResponseItem[];
  dataStatus: Status;
  dataError: any;
  //
  invigilatorsData: UserSummary[];
  invigilatorsDataStatus: Status;
  //
  invigilatorInfoMap: UserInfoMap;
  //
  updateStatus: Status;
  //
  autoAssignStatus: Status;
  //
  disableSaveBtn: boolean;
};

@Injectable()
export class InvigilatorAssignTeacherStore
  extends ComponentStore<InvigilatorAssignTeacherState>
  implements OnStoreInit
{
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<AppState>);
  private readonly facultyService = inject(FacultyService);
  private readonly examinationService = inject(ExaminationService);

  // STATE SELECTORS
  readonly data$ = this.select((s) => s.data);
  readonly dataStatus$ = this.select((s) => s.dataStatus);
  readonly updateStatus$ = this.select((s) => s.updateStatus);
  readonly autoAssignStatus$ = this.select((s) => s.autoAssignStatus);

  private readonly faculty$ = this.select((s) => s.faculty);
  private readonly disableSaveBtn$ = this.select((s) => s.disableSaveBtn);
  private readonly invigilatorsData$ = this.select((s) => s.invigilatorsData);
  private readonly invigilatorInfoMap$ = this.select(
    (s) => s.invigilatorInfoMap
  );

  // GLOBAL SELECTORS
  readonly faculties$ = this.appStore
    .select(AppSelector.faculties)
    .pipe(takeUntil(this.destroy$));

  private readonly examinationId$ = this.appStore
    .select(AppSelector.examinationId)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  private readonly user$ = this.appStore.pipe(
    AppSelector.notNullUser,
    takeUntil(this.destroy$)
  );

  // CUSTOM SELECTORS
  readonly role$ = this.user$.pipe(map((u) => u.role));

  private readonly departmentsInFaculty$ = combineLatest([
    this.appStore.select(AppSelector.departmentsWithFaculty),
    this.faculty$,
  ]).pipe(
    map(([departments, currentFaculty]) =>
      departments.filter((d) => d.faculty?.id === currentFaculty?.id)
    ),
    takeUntil(this.destroy$)
  );

  private readonly showLoader$ = combineLatest([
    this.dataStatus$,
    this.autoAssignStatus$,
  ]).pipe(map((statuses) => statuses.includes('loading')));

  readonly headerObservables$ = combineLatest([
    this.showLoader$,
    this.faculties$,
    this.faculty$,
    this.role$,
    this.disableSaveBtn$,
    this.updateStatus$,
  ]).pipe(
    map(
      ([
        showLoader,
        faculties,
        faculty,
        role,
        disableSaveBtn,
        updateStatus,
      ]) => ({
        showLoader,
        faculties,
        faculty,
        role,
        disableSaveBtn,
        updateStatus,
      })
    )
  );

  readonly tableObservables$ = combineLatest([
    this.data$,
    this.departmentsInFaculty$,
    this.invigilatorsData$,
    this.invigilatorInfoMap$,
    this.role$,
  ]).pipe(
    map(([data, departments, invigilatorsData, invigilatorInfoMap, role]) => ({
      data,
      departments,
      invigilatorsData,
      invigilatorInfoMap,
      role,
    }))
  );

  // PRIVATE PROPERTIES
  private gotExaminationDepartmentHeadRole$ = new Subject<void>();

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
                invigilatorInfoMap: invigilatorsData.reduce<UserInfoMap>(
                  (acc, curr) => {
                    const { phoneNumber, department } = curr;
                    acc[curr.id] = { phoneNumber, department };
                    return acc;
                  },
                  {}
                ),
              }),
            () => this.patchState({ invigilatorsDataStatus: 'error' })
          )
        )
      )
    )
  );

  /**
   * Called when select faculty from input select, only used if user has role `ExaminationDepartmentHead`
   */
  readonly changeFaculty = this.effect<string>((params$) =>
    params$.pipe(
      withLatestFrom(this.faculties$),
      tap(([id, faculties]) => {
        this.patchState({ faculty: faculties.find((f) => f.id === id) });
        this.getData();
        this.getInvigilatorsData();
      })
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
      faculty: null,
      data: [],
      dataStatus: 'loading',
      dataError: null,
      invigilatorsData: [],
      invigilatorsDataStatus: 'loading',
      invigilatorInfoMap: {},
      updateStatus: 'idle',
      autoAssignStatus: 'idle',
      disableSaveBtn: true,
    });
  }

  ngrxOnStoreInit(): void {
    this.handleFacultyChanges();
    this.handleGetUser();
  }

  private handleGetUser(): void {
    this.user$
      .pipe(
        tap((user) => {
          switch (user.role) {
            case 'ExaminationDepartmentHead':
              this.gotExaminationDepartmentHeadRole$.next();
              break;
            case 'Teacher':
              this.patchState({
                faculty: user.department?.faculty ?? user.faculty ?? null,
              });
              break;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  /**
   * Select first faculty. This function is called only if user has role `ExaminationDepartmentHead`
   */
  private handleFacultyChanges(): void {
    combineLatest([this.gotExaminationDepartmentHeadRole$, this.faculties$])
      .pipe(
        map(([_, faculties]) => faculties[0]),
        ObservableHelper.filterNullish(),
        tap((faculty) => this.patchState({ faculty })),
        take(1)
      )
      .subscribe();
  }
}
