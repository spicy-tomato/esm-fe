import { TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [APP_STORE_PROVIDER, NotificationService],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
