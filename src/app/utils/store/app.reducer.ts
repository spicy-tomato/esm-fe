import { createReducer, on } from '@ngrx/store';
import { AppApiAction } from './app.api.actions';
import { AppPageAction } from './app.page.actions';
import { AppState } from './app.state';

export const initialState: AppState = {
  user: null,
  status: 'idle',
};

export const appFeatureKey = '[NGRX Key] App';

export const appReducer = createReducer(
  initialState,
  on(AppPageAction.getUserInfo, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(AppPageAction.logOut, (state) => ({
    ...state,
    user: null,
  })),
  on(AppApiAction.noCacheUserInfo, (state) => ({
    ...state,
    status: 'success',
  })),
  on(AppApiAction.getUserInfoSuccessful, (state, { user }) => ({
    ...state,
    user,
    status: 'success',
  })),
  on(AppApiAction.getUserInfoFailed, (state) => ({
    ...state,
    user: null,
    status: 'error',
  }))
);
