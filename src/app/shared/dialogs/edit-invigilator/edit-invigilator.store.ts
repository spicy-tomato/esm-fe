import { Injectable } from '@angular/core';
import { ErrorResult, Status } from '@esm/cdk';
import { CreateUserRequest, UpdateUserRequest } from '@esm/data';
import { DepartmentService, UserService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap } from 'rxjs';
import { EsmHttpErrorResponse } from 'src/cdk/models/http-error-response';

type EditInvigilatorDialogState = {
  status: Status;
  errors: ErrorResult[] | null;
};

@Injectable()
export class EditInvigilatorDialogStore extends ComponentStore<EditInvigilatorDialogState> {
  // PUBLIC PROPERTIES
  readonly faculties$ = this.appStore
    .select(AppSelector.facultiesWithDepartment)
    .pipe(takeUntil(this.destroy$));
  readonly status$ = this.select((s) => s.status);
  readonly errors$ = this.select((s) => s.errors);

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
            () => this.patchState({ status: 'success' }),
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
              () => this.patchState({ status: 'success' }),
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
  constructor(
    private readonly userService: UserService,
    private readonly departmentService: DepartmentService,
    private readonly appStore: Store<AppState>
  ) {
    super({
      status: 'idle',
      errors: null,
    });
  }
}
