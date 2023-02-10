import { AppApiAction } from '../app.api.actions';
import { AppPageAction } from '../app.page.actions';
import { appReducer, initialState } from '../app.reducer';
import { AppState } from '../app.state';

describe('appReducer', () => {
  const mockLoggedInState: AppState = {
    user: {
      email: 'test@abc.com',
      fullName: 'Tester',
      userName: 'tester',
      joinedDate: new Date(),
    },
    status: 'success',
    breadcrumbs: [],
  };

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = { type: 'Unknown' };
      const state = appReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('AppPageAction.getUserInfo', () => {
    it('should patch status to `loading`', () => {
      const newState: AppState = {
        status: 'loading',
        user: null,
        breadcrumbs: [],
      };

      const action = AppPageAction.getUserInfo();
      const state = appReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('AppPageAction.logOut', () => {
    it('should patch status to `null`', () => {
      const newState: AppState = {
        status: 'success',
        user: null,
        breadcrumbs: [],
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
        status: 'success',
        user: null,
        breadcrumbs: [],
      };

      const action = AppApiAction.noCacheUserInfo();
      const state = appReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('AppApiAction.getUserInfoSuccessful', () => {
    it('should patch user data, status to `success`', () => {
      const action = AppApiAction.getUserInfoSuccessful({
        user: mockLoggedInState.user!,
      });
      const state = appReducer(initialState, action);

      expect(state).toEqual(mockLoggedInState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('AppApiAction.getUserInfoFailed', () => {
    it('should patch user to `null`, status to `error`', () => {
      const newState: AppState = {
        user: null,
        status: 'error',
        breadcrumbs: [],
      };

      const action = AppApiAction.getUserInfoFailed();
      const state = appReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });
});
