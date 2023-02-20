import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { APP_ENV } from '@esm/core';
import { FacultyService } from './faculty.service';

describe('FacultyService', () => {
  let service: FacultyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FacultyService, { provide: APP_ENV, useValue: {} }],
    });
    service = TestBed.inject(FacultyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
