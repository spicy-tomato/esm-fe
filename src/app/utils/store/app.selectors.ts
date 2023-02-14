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
  static readonly status = createSelector(
    this.selector,
    (state) => state.status
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
    this.status,
    ({ showLoader }, status) => {
      if (showLoader !== null) {
        return showLoader;
      }
      return status === 'idle' || status === 'loading';
    }
  );
}
