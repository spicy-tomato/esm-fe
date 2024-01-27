import { createAction, props } from '@ngrx/store';
import { ActionCreator, Creator } from '@ngrx/store/src/models';

export class NotificationPageAction {
  static readonly reset = createAction('[Notification/Page] Reset');

  static readonly getInitialData = createAction(
    '[Notification/Page] Get initial data',
  );

  static readonly getAll = createAction('[Notification/Page] Get all');

  static readonly getUnread = createAction('[Notification/Page] Get unread');

  static readonly actions = [this.getAll, this.getUnread];
  static readonly getData = (tab: number): ActionCreator<string, Creator> =>
    this.actions[tab];

  static readonly markAllAsRead = createAction(
    '[Notification/Page] Mark all as read',
  );

  static readonly markAsRead = createAction(
    '[Notification/Page] Mark as read',
    props<{ id: number }>(),
  );
}
