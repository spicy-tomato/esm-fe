import { Injectable } from '@angular/core';
import { Status } from '@esm/cdk';
import { ObservableHelper } from '@esm/core';
import {
  DepartmentSimple,
  FacultyWithDepartments,
  TemporaryExamination,
} from '@esm/data';
import { FacultyService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';

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
  private readonly facultiesWithDepartment$ = this.appStore
    .select(AppSelector.departments)
    .pipe(takeUntil(this.destroy$));
  readonly faculties$ = this.facultiesWithDepartment$.pipe(
    map((e) => e.map(({ departments, ...rest }) => rest))
  );
  readonly departments$ = this.facultiesWithDepartment$.pipe(
    map((e) =>
      e.reduce((acc, curr) => {
        acc = [
          ...acc,
          ...curr.departments.map((d) => ({ ...d, facultyId: curr.id })),
        ];
        return acc;
      }, [] as AddModuleDialogDepartment[])
    )
  );
  readonly status$ = this.select((s) => s.status);
  readonly error$ = this.select((s) => s.error);

  // EFFECTS
  readonly create = this.effect<AddModuleDialogCreateParams>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap(({ facultyId, ...rest }) =>
        this.facultyService.createModule(facultyId, rest).pipe(
          tapResponse(
            () => {
              this.patchState({ status: 'success' });
            },
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
    private readonly facultyService: FacultyService,
    private readonly appStore: Store<AppState>
  ) {
    super({
      status: 'idle',
      error: null,
    });
  }
}
