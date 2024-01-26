import { createFeatureSelector, createSelector } from '@ngrx/store';
import { notificationFeatureKey } from './notification.reducer';
import { NotificationState } from './notification.state';

export class NotificationSelector {
  private static notificationSelector =
    createFeatureSelector<NotificationState>(notificationFeatureKey);

  static readonly all = createSelector(
    this.notificationSelector,
    (state) => state.all,
  );

  static readonly unread = createSelector(
    this.notificationSelector,
    (state) => state.unread,
  );

  static readonly selectHasUnread = createSelector(
    this.notificationSelector,
    (state) => !!state.unread.data.length,
  );

  static readonly data = createSelector(this.notificationSelector, (state) =>
    [state.all, state.unread].map((x) => x.data),
  );

  static readonly hasNext = createSelector(this.notificationSelector, (state) =>
    [state.all, state.unread].map((x) => x.hasNext),
  );
}
