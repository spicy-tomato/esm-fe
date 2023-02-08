import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserService } from 'src/app/utils/services/user.service';
import { TokenService } from 'src/cdk/services/token.service';
import { AppApiAction } from './app.api.actions';
import { AppPageAction } from './app.page.actions';

@Injectable()
export class AppEffects {
  // EFFECTS
  readonly getUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppPageAction.getUserInfo),
      mergeMap(() => {
        if (!this.tokenService.get()) {
          return of(AppApiAction.noCacheUserInfo());
        }
        return this.userService.me().pipe(
          map(({ data }) => AppApiAction.getUserInfoSuccessful({ user: data })),
          catchError(() => of(AppApiAction.getUserInfoFailed()))
        );
      })
    );
  });

  readonly logOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AppPageAction.logOut),
        tap(() => {
          this.tokenService.clear();
          this.router.navigate(['']);
        })
      );
    },
    { dispatch: false }
  );

  // CONSTRUCTOR
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}
}
