import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { APP_ENV } from '@esm/core';
import { ExaminationService } from './examination.service';

describe('ExaminationService', () => {
  let service: ExaminationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExaminationService, { provide: APP_ENV, useValue: {} }],
    });
    service = TestBed.inject(ExaminationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
