import { createFeatureSelector, createSelector } from '@ngrx/store';
import { appFeatureKey } from './app.reducer';
import { AppState } from './app.state';

export class AppSelector {
  private static readonly selector =
    createFeatureSelector<AppState>(appFeatureKey);

  static readonly user = createSelector(this.selector, (state) => state.user);
  static readonly status = createSelector(
    this.selector,
    (state) => state.status
  );
}
