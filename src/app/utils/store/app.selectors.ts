import { ObservableHelper } from '@esm/core';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { map, Observable, pipe, UnaryFunction } from 'rxjs';
import { appFeatureKey } from './app.reducer';
import { AppState } from './app.state';

export class AppSelector {
  private static readonly selector =
    createFeatureSelector<AppState>(appFeatureKey);

  static readonly user = createSelector(this.selector, (state) => state.user);
  static readonly notNullUser = pipe(
    select(this.user),
    ObservableHelper.filterNullish()
  );
  static readonly userStatus = createSelector(
    this.selector,
    (state) => state.userStatus
  );
  static readonly permissions = createSelector(this.selector, () => [0]);

  static readonly userTitle = (
    useTitleCase = true
  ): UnaryFunction<Observable<object>, Observable<string>> =>
    pipe(
      this.notNullUser,
      map(({ isMale }) => {
        let title = isMale ? 'Thầy' : 'Cô';
        if (!useTitleCase) {
          title = title.toLocaleLowerCase();
        }
        return title;
      })
    );

  static readonly showLoader = createSelector(
    this.selector,
    this.userStatus,
    ({ showLoader: userShowLoader }, status) => {
      if (userShowLoader !== null) {
        return userShowLoader;
      }
      return status === 'idle' || status === 'loading';
    }
  );

  static readonly examinationStatus = createSelector(
    this.selector,
    (state) => state.examinationStatus
  );

  static readonly examination = createSelector(
    this.selector,
    (state) => state.examination
  );
}
