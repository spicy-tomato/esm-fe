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
    },
    displayId: null,
    id: 'id',
    isMale: true,
    roles: [],
  };
  const initialState: AppState = {
    userStatus: 'success',
    user: mockLoggedInUser,
    showLoader: null,
    examinationId: null,
    examination: null,
    examinationStatus: 'idle',
    relatedExaminations: [],
    relatedExaminationsError: null,
    relatedExaminationsStatus: 'idle',
    departments: [],
    departmentsError: null,
    departmentsStatus: 'idle',
  };

  describe('idle', () => {
    it('should return the default state', () => {
      const result = AppSelector.user.projector(initialState);
      expect(result).toEqual(mockLoggedInUser);
    });

    it('should return the default state', () => {
      const result = AppSelector.userStatus.projector(initialState);
      expect(result).toEqual('success');
    });
  });
});
