import { Injectable } from '@angular/core';
import { ErrorResult, EsmHttpErrorResponse, Status } from '@esm/cdk';
import { EditDepartmentRequest } from '@esm/data';
import { DepartmentService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap } from 'rxjs';

type EditDepartmentDialogState = {
  status: Status;
  errors: ErrorResult[] | null;
};

@Injectable()
export class EditDepartmentDialogStore extends ComponentStore<EditDepartmentDialogState> {
  // PUBLIC PROPERTIES
  readonly faculties$ = this.appStore
    .select(AppSelector.faculties)
    .pipe(takeUntil(this.destroy$));
  readonly status$ = this.select((s) => s.status);
  readonly errors$ = this.select((s) => s.errors);

  // EFFECTS
  readonly create = this.effect<EditDepartmentRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', errors: null })),
      switchMap((param) =>
        this.departmentService.create(param).pipe(
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

  readonly update = this.effect<{ id: string; request: EditDepartmentRequest }>(
    (params$) =>
      params$.pipe(
        tap(() => this.patchState({ status: 'loading', errors: null })),
        switchMap(({ id, request }) =>
          this.departmentService.update(id, request).pipe(
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
    private readonly departmentService: DepartmentService,
    private readonly appStore: Store<AppState>
  ) {
    super({
      status: 'idle',
      errors: null,
    });
  }
}
