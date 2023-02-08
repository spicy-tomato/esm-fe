import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { UserService } from 'src/app/utils/services/user.service';
import { TokenService } from 'src/cdk/services/token.service';
import { ResultBuilder } from 'src/cdk/test/result-builder';
import { APP_ENV } from 'src/core/config';
import { LoginComponent } from './login.component';
import { LoginStore } from './login.store';

describe('LoginComponentStore', () => {
  let store: LoginStore;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockTokenService: jasmine.SpyObj<TokenService>;
  let router: Router;
  let appStore: MockStore;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj<UserService>('UserService', [
      'login',
    ]);
    mockTokenService = jasmine.createSpyObj<TokenService>('TokenService', [
      'save',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [
        LoginStore,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
        { provide: APP_ENV, useValue: {} },
        provideMockStore({}),
      ],
    }).compileComponents();

    store = TestBed.inject(LoginStore);
    router = TestBed.inject(Router);
    appStore = TestBed.inject(MockStore);
  });

  it('should have initial state', () => {
    expect(store.status$).toBeObservable(cold('a', { a: 'idle' }));
  });

  describe('Effect login', () => {
    it('[Called] should patch state `loading`', () => {
      mockUserService.login.and.returnValue(cold('--|'));

      store.login({ userName: '', password: '' });

      expect(store.status$).toBeObservable(cold('a', { a: 'loading' }));
      expect(mockUserService.login).toHaveBeenCalled();
    });

    it('[Login successful] should save token to local storage, get user info and navigate to home page', fakeAsync(() => {
      const navigateSpy = spyOn(router, 'navigate');
      const getUserInfoSpy = spyOn(appStore, 'dispatch');

      mockUserService.login.and.returnValue(
        of(
          ResultBuilder.success({
            token: 'token response',
            expiration: new Date(),
          })
        )
      );

      store.login({ userName: '', password: '' });

      expect(mockTokenService.save).toHaveBeenCalledWith('token response');
      expect(navigateSpy).toHaveBeenCalledWith(['']);
      expect(getUserInfoSpy).toHaveBeenCalled();
    }));

    it('[Error] should patch state `error`', fakeAsync(() => {
      mockUserService.login.and.returnValue(cold('--#'));
      store.login({ userName: '', password: '' });

      expect(store.status$).toBeObservable(
        cold('a-b', { a: 'loading', b: 'error' })
      );
    }));
  });
});
