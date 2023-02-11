import { createAction, props } from '@ngrx/store';
import { EchoMessage } from '../models';
import { NotificationPage } from '../models/notification.model';

export class NotificationApiAction {
  static readonly getAllSuccessful = createAction(
    '[Notification/Page] Get all successfully',
    props<{ page: NotificationPage }>()
  );

  static readonly getAllFailed = createAction(
    '[Notification/Page] Get all failed'
  );

  static readonly getUnreadSuccessful = createAction(
    '[Notification/Page] Get unread successfully',
    props<{ page: NotificationPage }>()
  );

  static readonly getUnreadFailed = createAction(
    '[Notification/Page] Get unread failed'
  );

  static readonly markAllAsReadSuccessful = createAction(
    '[Notification/Page] Mark all as read successfully'
  );

  static readonly markAllAsReadFailed = createAction(
    '[Notification/Page] Mark all as read failed'
  );

  static readonly markAsReadSuccessful = createAction(
    '[Notification/Page] Mark as read successfully',
    props<{ id: number }>()
  );

  static readonly markAsReadFailed = createAction(
    '[Notification/Page] Mark as read failed'
  );

  static readonly add = createAction(
    '[Notification/Page] Add',
    props<{ notification: EchoMessage }>()
  );
}
