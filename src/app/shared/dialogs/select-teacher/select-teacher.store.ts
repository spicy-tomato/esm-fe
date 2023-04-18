import { inject, Injectable } from '@angular/core';
import { ErrorResult, EsmHttpErrorResponse, Status } from '@esm/cdk';
import { UserSummary } from '@esm/data';
import { UserService } from '@esm/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';

type SelectTeacherDialogState = {
  data: UserSummary[];
  status: Status;
  errors: ErrorResult[] | null;
};

@Injectable()
export class SelectTeacherDialogStore extends ComponentStore<SelectTeacherDialogState> {
  // INJECT PROPERTIES
  private readonly userService = inject(UserService);

  // PUBLIC PROPERTIES
  readonly data$ = this.select((s) => s.data);
  readonly status$ = this.select((s) => s.status);
  readonly errors$ = this.select((s) => s.errors);

  // EFFECTS
  readonly search = this.effect<string>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', errors: null })),
      switchMap((fullName) =>
        this.userService.search({ fullName }).pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                data: data.map((u) => Object.assign(new UserSummary(), u)),
                status: 'success',
              }),
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
      data: [],
    });
  }
}
