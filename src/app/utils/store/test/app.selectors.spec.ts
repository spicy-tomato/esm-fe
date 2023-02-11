import { AppSelector } from '../app.selectors';
import { AppState } from '../app.state';

describe('AppSelector', () => {
  const mockLoggedInUser = {
    email: 'test@abc.com',
    fullName: 'Tester',
    userName: 'tester',
    joinedDate: new Date(2023),
  };
  const initialState: AppState = {
    status: 'success',
    user: mockLoggedInUser,
    breadcrumbs: [],
  };

  describe('idle', () => {
    it('should return the default state', () => {
      const result = AppSelector.user.projector(initialState);
      expect(result).toEqual(mockLoggedInUser);
    });

    it('should return the default state', () => {
      const result = AppSelector.status.projector(initialState);
      expect(result).toEqual('success');
    });
  });
});
