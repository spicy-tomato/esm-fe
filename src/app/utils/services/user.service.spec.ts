import { TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [APP_STORE_PROVIDER, UserService],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
