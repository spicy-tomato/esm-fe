import { inject, Injectable } from '@angular/core';
import { Status } from '@esm/cdk';
import { UserSummary } from '@esm/data';
import { UserService } from '@esm/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';

type DataResetPasswordState = {
  data: UserSummary[];
  status: Status;
};

@Injectable()
export class DataResetPasswordStore extends ComponentStore<DataResetPasswordState> {
  // INJECT PROPERTIES
  private readonly userService = inject(UserService);

  // STATE SELECTORS
  readonly data$ = this.select((s) => s.data);
  readonly status$ = this.select((s) => s.status);

  // EFFECTS
  readonly getData = this.effect<void>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading' })),
      switchMap(() =>
        this.userService.getAllInvigilators('isFaculty').pipe(
          tapResponse(
            ({ data }) =>
              this.patchState({
                data: data,
                status: 'success',
              }),
            () => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  // CONSTRUCTOR
  constructor() {
    super({
      data: [],
      status: 'idle',
    });
  }
}
