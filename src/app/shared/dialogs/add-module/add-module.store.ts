import { inject, Injectable } from '@angular/core';
import { Status } from '@esm/cdk';
import { DepartmentSimple, FacultyWithDepartments } from '@esm/data';
import { FacultyService } from '@esm/api';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { combineLatest, map, switchMap, takeUntil, tap } from 'rxjs';

type AddModuleDialogState = {
  status: Status;
  error: string | null;
};

export type AddModuleDialogFaculty = Omit<
  FacultyWithDepartments,
  'departments'
>;

export type AddModuleDialogDepartment = DepartmentSimple & {
  facultyId: string;
};

export type AddModuleDialogCreateParams = {
  displayId: string;
  name: string;
  facultyId: string;
  departmentId: string | null;
};

@Injectable()
export class AddModuleDialogStore extends ComponentStore<AddModuleDialogState> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<AppState>);
  private readonly facultyService = inject(FacultyService);

  // STATE SELECTORS
  readonly status$ = this.select((s) => s.status);

  // GLOBAL SELECTORS
  private readonly facultiesWithDepartment$ = this.appStore
    .select(AppSelector.facultiesWithDepartment)
    .pipe(takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  readonly faculties$ = this.facultiesWithDepartment$.pipe(
    map((e) => e.map(({ departments, ...rest }) => rest)),
  );

  readonly departments$ = this.facultiesWithDepartment$.pipe(
    map((e) =>
      e.reduce((acc, curr) => {
        acc = [
          ...acc,
          ...curr.departments.map((d) => ({ ...d, facultyId: curr.id })),
        ];
        return acc;
      }, [] as AddModuleDialogDepartment[]),
    ),
  );

  readonly observables$ = combineLatest([
    this.faculties$,
    this.departments$,
    this.status$,
  ]).pipe(
    map(([faculties, departments, status]) => ({
      faculties,
      departments,
      status,
    })),
  );

  // EFFECTS
  readonly create = this.effect<AddModuleDialogCreateParams>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap(({ facultyId, ...rest }) =>
        this.facultyService.createModuleFaculty(facultyId, rest).pipe(
          tapResponse(
            () => {
              this.patchState({ status: 'success' });
            },
            (error) =>
              this.patchState({
                status: 'error',
                error: error as string,
              }),
          ),
        ),
      ),
    ),
  );

  // CONSTRUCTOR
  constructor() {
    super({
      status: 'idle',
      error: null,
    });
  }
}
