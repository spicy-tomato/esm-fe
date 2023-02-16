import { createReducer, on } from '@ngrx/store';
import { AppApiAction } from './app.api.actions';
import { AppPageAction } from './app.page.actions';
import { AppState } from './app.state';

export const appInitialState: AppState = {
  showLoader: null,
  user: null,
  userStatus: 'idle',
  //
  examinationId: null,
  examination: null,
  examinationStatus: 'idle',
  //
  relatedExaminations: [],
  relatedExaminationsStatus: 'idle',
  relatedExaminationsError: null,
};

export const appFeatureKey = '[NGRX Key] App';

export const appReducer = createReducer(
  appInitialState,
  on(AppPageAction.getUserInfo, (state) => ({
    ...state,
    userStatus: 'loading',
  })),
  on(AppPageAction.logOut, (state) => ({
    ...state,
    user: null,
  })),
  on(AppPageAction.getRelatedExaminations, (state) => ({
    ...state,
    relatedExaminationsStatus: 'loading',
  })),
  on(AppApiAction.noCacheUserInfo, (state) => ({
    ...state,
    userStatus: 'success',
  })),
  on(AppApiAction.getUserInfoSuccessful, (state, { user }) => ({
    ...state,
    user: user,
    userStatus: 'success',
  })),
  on(AppApiAction.getUserInfoFailed, (state) => ({
    ...state,
    user: null,
    userStatus: 'error',
  })),
  on(AppApiAction.changeExaminationId, (state, { id }) => ({
    ...state,
    examinationId: id,
    examinationStatus: 'loading',
  })),
  on(AppApiAction.getExaminationSuccessful, (state, { examination }) => ({
    ...state,
    examination,
    examinationStatus: 'success',
    relatedExaminations:
      examination === null ||
      state.relatedExaminations.find((e) => e.id === examination.id)
        ? state.relatedExaminations
        : [...state.relatedExaminations, examination],
  })),
  on(AppApiAction.getExaminationFailed, (state) => ({
    ...state,
    examination: null,
    examinationStatus: 'error',
  })),
  on(
    AppApiAction.getRelatedExaminationsSuccessful,
    (state, { relatedExaminations }) => ({
      ...state,
      relatedExaminations,
      relatedExaminationsStatus: 'success',
    })
  ),
  on(AppApiAction.getRelatedExaminationsFailed, (state) => ({
    ...state,
    relatedExaminations: [],
    relatedExaminationsStatus: 'error',
  }))
);
