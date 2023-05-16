import { TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { FacultyService } from './faculty.service';

describe('FacultyService', () => {
  let service: FacultyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [APP_STORE_PROVIDER, FacultyService],
    });
    service = TestBed.inject(FacultyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
