import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@esm/cdk';
import { ExaminationService, SchoolService, UserService } from '@esm/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { AppApiAction } from './app.api.actions';
import { AppPageAction } from './app.page.actions';
import { AppSelector } from './app.selectors';
import { AppState } from './app.state';

@Injectable()
export class AppEffects {
  // PRIVATE PROPERTIES
  private examinationId$ = this.appStore.select(AppSelector.examinationId);
  private user$ = this.appStore.pipe(AppSelector.notNullUser);

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
        tap(async () => {
          this.tokenService.clear();
          await this.router.navigate(['']);
        })
      );
    },
    { dispatch: false }
  );

  readonly getRelatedExaminations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppPageAction.getRelatedExaminations),
      mergeMap(() => {
        return this.examinationService.getRelated().pipe(
          map(({ data: relatedExaminations }) =>
            AppApiAction.getRelatedExaminationsSuccessful({
              relatedExaminations,
            })
          ),
          catchError(() => of(AppApiAction.getRelatedExaminationsFailed()))
        );
      })
    );
  });

  readonly getDepartments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppPageAction.getDepartments),
      withLatestFrom(this.user$),
      mergeMap(({ 1: user }) => {
        const schoolId = user.department.school.id;
        return this.schoolService.getDepartments(schoolId).pipe(
          map(({ data: departments }) =>
            AppApiAction.getDepartmentsSuccessful({ departments })
          ),
          catchError(() => of(AppApiAction.getDepartmentsFailed()))
        );
      })
    );
  });

  readonly changeRouter$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(routerNavigatedAction),
        withLatestFrom(this.examinationId$),
        map(([{ payload }, oldId]) => {
          let firstChild = payload.routerState.root.firstChild;
          let id: string | null = null;
          while (firstChild) {
            if (firstChild.params['examinationId']) {
              id = firstChild.params['examinationId'];
              break;
            }
            firstChild = firstChild.firstChild;
          }

          if (id !== oldId) {
            this.appStore.dispatch(AppApiAction.changeExaminationId({ id }));
          }

          return of(null);
        })
      );
    },
    { dispatch: false }
  );

  readonly changeExaminationId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppApiAction.changeExaminationId),
      mergeMap(({ id }) => {
        if (id === null) {
          return of(
            AppApiAction.getExaminationSuccessful({ examination: null })
          );
        }
        return this.examinationService.getSummary(id).pipe(
          map(({ data: examination }) =>
            AppApiAction.getExaminationSuccessful({ examination })
          ),
          catchError(() => of(AppApiAction.getExaminationFailed()))
        );
      })
    );
  });

  // CONSTRUCTOR
  constructor(
    private readonly actions$: Actions,
    private readonly appStore: Store<AppState>,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly examinationService: ExaminationService,
    private readonly schoolService: SchoolService,
    private readonly tokenService: TokenService
  ) {}
}
