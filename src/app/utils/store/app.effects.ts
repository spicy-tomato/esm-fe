import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@esm/cdk';
import { ExaminationService, FacultyService, UserService } from '@esm/services';
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
  // INJECT PROPERTIES
  private readonly router = inject(Router);
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);
  private readonly appStore = inject(Store<AppState>);
  private readonly tokenService = inject(TokenService);
  private readonly facultyService = inject(FacultyService);
  private readonly examinationService = inject(ExaminationService);

  // PRIVATE PROPERTIES
  private examinationId$ = this.appStore.select(AppSelector.examinationId);

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
          void this.router.navigate(['/login']);
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
      mergeMap(() => {
        return this.facultyService.getAll().pipe(
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
        return of(AppPageAction.getExaminationSummary({ id }));
      })
    );
  });

  readonly getExaminationSummary$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppPageAction.getExaminationSummary),
      mergeMap(({ id }) => {
        return this.examinationService.getSummary(id).pipe(
          map(({ data: examination }) =>
            AppApiAction.getExaminationSuccessful({ examination })
          ),
          catchError(() => of(AppApiAction.getExaminationFailed()))
        );
      })
    );
  });
}
