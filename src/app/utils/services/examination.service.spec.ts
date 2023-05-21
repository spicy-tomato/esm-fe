import { TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { ExaminationService } from './examination.service';

describe('ExaminationService', () => {
  let service: ExaminationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [APP_STORE_PROVIDER, ExaminationService],
    });
    service = TestBed.inject(ExaminationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
