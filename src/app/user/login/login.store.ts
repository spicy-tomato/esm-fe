import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Status, TokenService } from '@esm/cdk';
import { LoginRequest } from '@esm/data';
import { UserService } from '@esm/services';
import { AppPageAction, AppState } from '@esm/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs';

type LoginState = {
  status: Status;
  error: string | null;
};

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  // INJECT PROPERTIES
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly appStore = inject(Store<AppState>);
  private readonly tokenService = inject(TokenService);

  // PROPERTIES
  readonly status$ = this.select((s) => s.status);

  // EFFECTS
  readonly login = this.effect<LoginRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap((request) =>
        this.userService.login(request).pipe(
          tapResponse(
            async ({ data }) => {
              this.tokenService.save(data.token);
              this.appStore.dispatch(AppPageAction.getUserInfo());
              await this.router.navigate(['']);
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
  constructor() {
    super({ status: 'idle', error: null });
  }
}
