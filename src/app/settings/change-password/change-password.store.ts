import { Injectable } from '@angular/core';
import { Status } from '@esm/cdk';
import { ChangePasswordRequest } from '@esm/data';
import { UserService } from '@esm/services';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil, tap } from 'rxjs';

type SettingsChangePasswordState = {
  status: Status;
  error: string | null;
};

@Injectable()
export class SettingsChangePasswordStore extends ComponentStore<SettingsChangePasswordState> {
  // PUBLIC PROPERTIES
  readonly status$ = this.select((s) => s.status);
  readonly userTitle$ = this.appShellStore.pipe(
    AppSelector.userTitle(),
    takeUntil(this.destroy$)
  );
  private readonly teacher$ = this.appShellStore.pipe(
    AppSelector.notNullUser,
    takeUntil(this.destroy$)
  );

  // EFFECTS
  readonly change = this.effect<ChangePasswordRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap((params) =>
        this.userService.changePassword(params).pipe(
          tapResponse(
            () =>
              this.patchState({
                status: 'success',
                error: '',
              }),
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
    private readonly userService: UserService,
    private readonly appShellStore: Store<AppState>
  ) {
    super({
      status: 'idle',
      error: null,
    });
  }
}
