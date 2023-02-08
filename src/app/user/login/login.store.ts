import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/utils/services/user.service';
import { AppPageAction, AppState } from 'src/app/utils/store';
import { Status } from 'src/cdk';
import { TokenService } from 'src/cdk/services/token.service';
import { LoginRequest } from 'src/data/requests';

type LoginState = {
  status: Status;
  error: string | null;
};

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  // PROPERTIES
  readonly status$ = this.select((s) => s.status);

  // EFFECTS
  readonly login = this.effect<LoginRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap((request) =>
        this.userService.login(request).pipe(
          tapResponse(
            ({ data }) => {
              this.tokenService.save(data.token);
              this.appStore.dispatch(AppPageAction.getUserInfo());
              this.router.navigate(['']);
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
    private readonly router: Router,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly appStore: Store<AppState>
  ) {
    super({ status: 'idle', error: null });
  }
}
