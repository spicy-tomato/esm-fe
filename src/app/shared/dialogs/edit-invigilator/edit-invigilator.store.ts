import { inject, Injectable } from '@angular/core';
import { ErrorResult, EsmHttpErrorResponse, Status } from '@esm/cdk';
import { CreateUserRequest, UpdateUserRequest, UserSummary } from '@esm/data';
import { DepartmentService, UserService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap } from 'rxjs';

type EditInvigilatorDialogState = {
  status: Status;
  errors: ErrorResult[] | null;
  responseData: UserSummary | null;
};

@Injectable()
export class EditInvigilatorDialogStore extends ComponentStore<EditInvigilatorDialogState> {
  // INJECT PROPERTIES
  private readonly userService = inject(UserService);
  private readonly appStore = inject(Store<AppState>);
  private readonly departmentService = inject(DepartmentService);

  // PUBLIC PROPERTIES
  readonly faculties$ = this.appStore
    .select(AppSelector.facultiesWithDepartment)
    .pipe(takeUntil(this.destroy$));
  readonly status$ = this.select((s) => s.status);
  readonly errors$ = this.select((s) => s.errors);
  readonly responseData$ = this.select((s) => s.responseData);

  // EFFECTS
  readonly create = this.effect<{
    departmentId: string;
    request: CreateUserRequest;
  }>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', errors: null })),
      switchMap(({ departmentId, request }) =>
        this.departmentService.createUser(departmentId, request).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({ responseData: data, status: 'success' }),
            (res: EsmHttpErrorResponse) =>
              this.patchState({
                status: 'error',
                errors: res.error.errors,
              })
          )
        )
      )
    )
  );

  readonly update = this.effect<{ id: string; request: UpdateUserRequest }>(
    (params$) =>
      params$.pipe(
        tap(() => this.patchState({ status: 'loading', errors: null })),
        switchMap(({ id, request }) =>
          this.userService.update(id, request).pipe(
            tapResponse(
              ({ data }) =>
                this.patchState({ responseData: data, status: 'success' }),
              (res: EsmHttpErrorResponse) =>
                this.patchState({
                  status: 'error',
                  errors: res.error.errors,
                })
            )
          )
        )
      )
  );

  // CONSTRUCTOR
  constructor() {
    super({
      status: 'idle',
      errors: null,
      responseData: null,
    });
  }
}
