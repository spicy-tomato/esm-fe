import { UserSummary } from '@esm/data';
import { AppSelector } from '../app.selectors';
import { AppState } from '../app.state';

describe('AppSelector', () => {
  const mockLoggedInUser: UserSummary = {
    email: 'test@abc.com',
    fullName: 'Tester',
    createdAt: new Date(2023),
    department: {
      displayId: null,
      faculty: null,
      id: 'fac',
      name: 'fn',
      school: {
        displayId: null,
        id: 'sc',
        name: 'sc',
      },
    },
    displayId: null,
    id: 'id',
    isMale: true,
    roles: [],
  };
  const initialState: AppState = {
    status: 'success',
    user: mockLoggedInUser,
    showLoader: null,
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
