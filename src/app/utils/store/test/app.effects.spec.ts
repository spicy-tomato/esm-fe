import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  APP_STORE_PROVIDER,
  TESTING_COMMON_IMPORTS,
  TokenService,
} from '@esm/cdk';
import { UserSummary } from '@esm/data';
import { UserService } from '@esm/services';
import { AppEffects } from '@esm/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

describe('AppEffects', () => {
  const mockLoggedInUser: UserSummary = {
    email: 'test@abc.com',
    fullName: 'Tester',
    createdAt: new Date(),
    department: {
      displayId: null,
      faculty: null,
      id: 'fac',
      name: 'fn',
    },
    faculty: null,
    invigilatorId: '',
    id: 'id',
    isMale: true,
    role: 'ExaminationDepartmentHead',
    phoneNumber: '',
  };
  let actions$: Observable<Action>;
  let mockTokenService: jasmine.SpyObj<TokenService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let effects: AppEffects;
  let router: Router;

  beforeEach(() => {
    actions$ = new Observable<Action>();
    mockTokenService = jasmine.createSpyObj<TokenService>('TokenService', [
      'get',
      'clear',
    ]);
    mockUserService = jasmine.createSpyObj<UserService>('UserService', ['me']);

    TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [
        APP_STORE_PROVIDER,
        AppEffects,
        provideMockActions(() => actions$),
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    });

    effects = TestBed.inject(AppEffects);
    router = TestBed.inject(Router);
  });

  describe('getUserInfo$', () => {
    it('should call tokenService.get()', () => {
      actions$ = of({ type: '[App/Page] Get user info' });
      effects.getUserInfo$.subscribe();

      expect(mockTokenService.get).toHaveBeenCalled();
    });

    it('[Token misses] should dispatch `noCacheUserInfo`', () => {
      const expected = hot('-a--', {
        a: { type: '[App/API] No cache user info' },
      });
      actions$ = hot('-a--', { a: { type: '[App/Page] Get user info' } });

      expect(effects.getUserInfo$).toBeObservable(expected);
    });

    it('[Token misses] should not call userService.me())', () => {
      mockTokenService.get.and.returnValue(null);
      actions$ = of({ type: '[App/Page] Get user info' });
      effects.getUserInfo$.subscribe();

      expect(mockUserService.me).not.toHaveBeenCalled();
    });

    it('[Token exists][Response OK] should dispatch `getUserInfoSuccessful`', () => {
      mockTokenService.get.and.returnValue('saved token');
      mockUserService.me.and.returnValue(
        cold('--a|', {
          a: {
            data: mockLoggedInUser,
            errors: null,
            success: true,
          },
        })
      );

      actions$ = of({ type: '[App/Page] Get user info' });
      effects.getUserInfo$.subscribe((res) => {
        expect(res).toEqual({
          type: '[App/API] Get user info successful',
          user: mockLoggedInUser,
        });
      });
    });

    it('[Token exists][Response error] should dispatch `getUserInfoFailed`', () => {
      mockTokenService.get.and.returnValue('saved token');
      mockUserService.me.and.returnValue(cold('--#'));

      actions$ = of({ type: '[App/Page] Get user info' });
      effects.getUserInfo$.subscribe((res) => {
        expect(res).toEqual({ type: '[App/API] Get user info failed' });
      });
    });
  });

  describe('logOut$', () => {
    it('should call tokenService.clear() and outer.navigate()', () => {
      const navigateSpy = spyOn(router, 'navigate').and.returnValue(
        new Promise(() => true)
      );
      actions$ = of({ type: '[App/Page] Log out' });
      effects.logOut$.subscribe();

      expect(mockTokenService.clear).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
  });
});
