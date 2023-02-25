import { Injectable } from '@angular/core';
import { Status } from '@esm/cdk';
import { UserSimple, UserSummary } from '@esm/data';
import { FacultyService, UserService } from '@esm/services';
import { AppPageAction, AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

type DataInvigilatorState = {
  selectedFacultyId: string;
  selectedDepartmentId: string;
  invigilators: UserSummary[];
  cachedFacultyIds: string[];
  status: Status;
};

@Injectable()
export class DataInvigilatorStore extends ComponentStore<DataInvigilatorState> {
  // PUBLIC PROPERTIES
  readonly faculties$ = this.appStore
    .select(AppSelector.faculties)
    .pipe(takeUntil(this.destroy$));
  readonly facultiesWithDepartment$ = this.appStore
    .select(AppSelector.facultiesWithDepartment)
    .pipe(takeUntil(this.destroy$));
  readonly status$ = this.appStore
    .select(AppSelector.departmentsStatus)
    .pipe(takeUntil(this.destroy$));
  readonly selectedFacultyId$ = this.select((s) => s.selectedFacultyId);
  readonly cachedFacultyIds$ = this.select((s) => s.cachedFacultyIds);
  readonly invigilators$ = this.select((s) => s.invigilators);
  readonly selectedFacultyName$ = combineLatest([
    this.faculties$,
    this.selectedFacultyId$,
  ]).pipe(
    map(([faculties, id]) => faculties.find((f) => f.id === id)?.name || '')
  );
  readonly departments$ = combineLatest([
    this.facultiesWithDepartment$,
    this.selectedFacultyId$,
  ]).pipe(
    map(
      ([faculties, id]) => faculties.find((f) => f.id === id)?.departments || []
    )
  );
  readonly selectedDepartmentId$ = this.select((s) => s.selectedDepartmentId);
  readonly selectedDepartmentName$ = combineLatest([
    this.departments$,
    this.selectedDepartmentId$,
  ]).pipe(
    map(([departments, id]) => departments.find((d) => d.id === id)?.name || '')
  );

  // EFFECTS
  readonly changeQueryParams = this.effect<{
    facultyId: string;
    departmentId: string;
  }>((params$) =>
    params$.pipe(
      withLatestFrom(this.selectedFacultyId$, this.selectedDepartmentId$),
      tap(
        ([
          { facultyId, departmentId },
          selectedFacultyId,
          selectedDepartmentId,
        ]) => {
          if (
            facultyId !== selectedFacultyId ||
            // Case reload page, and query params is empty
            (facultyId === selectedFacultyId &&
              departmentId === selectedDepartmentId)
          ) {
            this.changeSelectedFaculty({ facultyId, departmentId });
          } else if (departmentId !== selectedDepartmentId) {
            this.changeSelectedDepartment(departmentId);
          }
        }
      )
    )
  );

  private readonly changeSelectedFaculty = this.effect<{
    facultyId: string;
    departmentId: string;
  }>((params$) =>
    params$.pipe(
      tap(({ facultyId, departmentId }) =>
        this.patchState({
          selectedFacultyId: facultyId,
          selectedDepartmentId: departmentId,
          status: 'loading',
        })
      ),
      withLatestFrom(this.cachedFacultyIds$, this.faculties$),
      switchMap(([{ facultyId }, cached, faculties]) => {
        if (cached.length === faculties.length || cached.includes(facultyId)) {
          this.patchState({ status: 'success' });
          return of(null);
        }

        const request = facultyId
          ? this.facultyService.getUsers(facultyId)
          : this.userService.getAllInvigilators();

        return request.pipe(
          tapResponse(
            ({ data }) => {
              this.patchState((state) => ({
                invigilators: facultyId
                  ? [...state.invigilators, ...data]
                  : data,
                cachedFacultyIds: facultyId
                  ? [...state.cachedFacultyIds, facultyId]
                  : faculties.map((f) => f.id),
                status: 'success',
              }));
            },
            () => this.patchState({ status: 'error' })
          )
        );
      })
    )
  );

  private readonly changeSelectedDepartment = this.effect<string>((params$) =>
    params$.pipe(tap((id) => this.patchState({ selectedDepartmentId: id })))
  );

  // CONSTRUCTOR
  constructor(
    private readonly userService: UserService,
    private readonly facultyService: FacultyService,
    private readonly appStore: Store<AppState>
  ) {
    super({
      selectedFacultyId: '',
      selectedDepartmentId: '',
      invigilators: [],
      cachedFacultyIds: [],
      status: 'idle',
    });
  }

  // PUBLIC METHODS
  load(): void {
    this.appStore.dispatch(AppPageAction.getDepartments());
  }
}
