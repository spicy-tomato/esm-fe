import { AppApiAction } from '../app.api.actions';
import { AppPageAction } from '../app.page.actions';
import { appReducer, appInitialState } from '../app.reducer';
import { AppState } from '../app.state';

describe('appReducer', () => {
  const mockLoggedInState: AppState = {
    user: {
      email: 'test@abc.com',
      fullName: 'Tester',
      createdAt: new Date(),
      department: {
        displayId: null,
        faculty: null,
        id: 'fac',
        name: 'fn',
      },
      invigilatorId: '',
      id: 'id',
      isMale: true,
      roles: [],
    },
    userStatus: 'success',
    showLoader: null,
    examination: null,
    examinationId: null,
    examinationStatus: 'idle',
    relatedExaminations: [],
    relatedExaminationsError: null,
    relatedExaminationsStatus: 'idle',
    departments: [],
    departmentsError: null,
    departmentsStatus: 'idle',
  };

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = { type: 'Unknown' };
      const state = appReducer(appInitialState, action);

      expect(state).toBe(appInitialState);
    });
  });

  describe('AppPageAction.getUserInfo', () => {
    it('should patch status to `loading`', () => {
      const newState: AppState = {
        userStatus: 'loading',
        user: null,
        showLoader: null,
        examination: null,
        examinationId: null,
        examinationStatus: 'idle',
        relatedExaminations: [],
        relatedExaminationsError: null,
        relatedExaminationsStatus: 'idle',
        departments: [],
        departmentsError: null,
        departmentsStatus: 'idle',
      };

      const action = AppPageAction.getUserInfo();
      const state = appReducer(appInitialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(appInitialState);
    });
  });

  describe('AppPageAction.logOut', () => {
    it('should patch status to `null`', () => {
      const newState: AppState = {
        userStatus: 'success',
        user: null,
        showLoader: null,
        examination: null,
        examinationId: null,
        examinationStatus: 'idle',
        relatedExaminations: [],
        relatedExaminationsError: null,
        relatedExaminationsStatus: 'idle',
        departments: [],
        departmentsError: null,
        departmentsStatus: 'idle',
      };

      const action = AppPageAction.logOut();
      const state = appReducer(mockLoggedInState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(mockLoggedInState);
    });
  });

  describe('AppApiAction.noCacheUserInfo', () => {
    it('should patch user to `success`', () => {
      const newState: AppState = {
        userStatus: 'success',
        user: null,
        showLoader: null,
        examination: null,
        examinationId: null,
        examinationStatus: 'idle',
        relatedExaminations: [],
        relatedExaminationsError: null,
        relatedExaminationsStatus: 'idle',
        departments: [],
        departmentsError: null,
        departmentsStatus: 'idle',
      };

      const action = AppApiAction.noCacheUserInfo();
      const state = appReducer(appInitialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(appInitialState);
    });
  });

  describe('AppApiAction.getUserInfoSuccessful', () => {
    it('should patch user data, status to `success`', () => {
      const action = AppApiAction.getUserInfoSuccessful({
        user: mockLoggedInState.user!,
      });
      const state = appReducer(appInitialState, action);

      expect(state).toEqual(mockLoggedInState);
      expect(state).not.toBe(appInitialState);
    });
  });

  describe('AppApiAction.getUserInfoFailed', () => {
    it('should patch user to `null`, status to `error`', () => {
      const newState: AppState = {
        user: null,
        userStatus: 'error',
        showLoader: null,
        examination: null,
        examinationId: null,
        examinationStatus: 'idle',
        relatedExaminations: [],
        relatedExaminationsError: null,
        relatedExaminationsStatus: 'idle',
        departments: [],
        departmentsError: null,
        departmentsStatus: 'idle',
      };

      const action = AppApiAction.getUserInfoFailed();
      const state = appReducer(appInitialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(appInitialState);
    });
  });
});
