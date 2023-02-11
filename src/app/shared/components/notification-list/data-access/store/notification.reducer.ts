import { createReducer, on } from '@ngrx/store';
import { NotificationApiAction } from './notification.api.actions';
import { NotificationPageAction } from './notification.page.actions';
import { NotificationState } from './notification.state';

export const notificationInitialState: NotificationState = {
  all: {
    data: [],
    status: 'idle',
    milestone: new Date().toString(),
    error: null,
    hasNext: false,
  },
  unread: {
    data: [],
    status: 'idle',
    milestone: new Date().toString(),
    error: null,
    hasNext: false,
  },
};

export const notificationFeatureKey = 'notification';

export const notificationReducer = createReducer(
  notificationInitialState,
  on(NotificationPageAction.reset, () => notificationInitialState),
  on(NotificationPageAction.getAll, (state) => ({
    ...state,
    all: {
      ...state.all,
      status: 'loading',
    },
  })),
  on(NotificationPageAction.getUnread, (state) => ({
    ...state,
    unread: {
      ...state.unread,
      status: 'loading',
    },
  })),
  on(NotificationPageAction.markAllAsRead, (state) => ({
    ...state,
    all: {
      ...state.all,
      data: state.all.data.map((x) => {
        if (x.readAt) {
          return x;
        }
        const copy = { ...x };
        copy.readAt = new Date();
        return copy;
      }),
    },
    unread: {
      ...state.unread,
      data: [],
      hasNext: false,
    },
  })),
  on(NotificationPageAction.markAsRead, (state, { id }) => ({
    ...state,
    all: {
      ...state.all,
      data: state.all.data.map((x) => {
        if (x.id !== id) {
          return x;
        }
        const copy = { ...x };
        copy.readAt = new Date();
        return copy;
      }),
    },
    unread: {
      ...state.unread,
      data: state.unread.data.filter((x) => x.id !== id),
    },
  })),
  on(NotificationApiAction.getAllSuccessful, (state, { page }) => ({
    ...state,
    all: {
      ...state.all,
      data: [...state.all.data, ...page.data],
      status: 'success',
      milestone: page.milestone,
      hasNext: page.hasNext,
    },
  })),
  on(NotificationApiAction.getUnreadSuccessful, (state, { page }) => ({
    ...state,
    unread: {
      ...state.unread,
      data: [...state.unread.data, ...page.data],
      status: 'success',
      milestone: page.milestone,
      hasNext: page.hasNext,
    },
  })),
  on(NotificationApiAction.getAllFailed, (state) => ({
    ...state,
    all: {
      ...state.all,
      status: 'error',
    },
  })),
  on(NotificationApiAction.getUnreadFailed, (state) => ({
    ...state,
    unread: {
      ...state.unread,
      status: 'error',
    },
  })),
  on(NotificationApiAction.add, (state, { notification }) => ({
    ...state,
    all: {
      ...state.all,
      data: [notification, ...state.all.data],
    },
    unread: {
      ...state.unread,
      data: [notification, ...state.unread.data],
    },
  }))
);
