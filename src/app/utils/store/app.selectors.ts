import { ObservableHelper } from '@esm/core';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { pipe } from 'rxjs';
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
}
