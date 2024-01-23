import { Injectable, inject } from '@angular/core';
import { Status } from '@esm/cdk';
import { ChangePasswordRequest } from '@esm/data';
import { AuthService } from '@esm/api';
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
  // INJECT PROPERTIES
  private readonly authService = inject(AuthService);
  private readonly appStore = inject(Store<AppState>);

  // PUBLIC PROPERTIES
  readonly status$ = this.select((s) => s.status);
  readonly userTitle$ = this.appStore.pipe(
    AppSelector.userTitle(),
    takeUntil(this.destroy$)
  );

  // EFFECTS
  readonly change = this.effect<ChangePasswordRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap((params) =>
        this.authService.changePassword(params).pipe(
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
  constructor() {
    super({
      status: 'idle',
      error: null,
    });
  }
}
