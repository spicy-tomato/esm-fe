import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ResultBuilder } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import { ExaminationStatus } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { LoginComponent } from 'src/app/user/login/login.component';
import { CreateStore } from './create.store';

describe('CreateStore', () => {
  let store: CreateStore;
  let mockExaminationService: jasmine.SpyObj<ExaminationService>;
  let router: Router;
  let appStore: MockStore;

  beforeEach(async () => {
    mockExaminationService = jasmine.createSpyObj<ExaminationService>(
      'ExaminationService',
      ['create']
    );

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [
        CreateStore,
        {
          provide: ExaminationService,
          useValue: mockExaminationService,
        },
        { provide: APP_ENV, useValue: {} },
        provideMockStore({}),
      ],
    }).compileComponents();

    store = TestBed.inject(CreateStore);
    router = TestBed.inject(Router);
    appStore = TestBed.inject(MockStore);
  });

  it('should have initial state', () => {
    const expected = cold('a', { a: 'idle' });
    expect(store.status$).toBeObservable(expected);
  });

  describe('Effect create', () => {
    const params = {
      name: 'Mock name',
      displayId: 'Mock ID',
      description: 'Mock description',
      expectStartAt: new Date(2023, 0, 1, 7, 0, 0, 0),
      expectEndAt: new Date(2023, 1, 1, 7, 0, 0, 0),
    };

    it('[Called] should patch state `loading`', () => {
      mockExaminationService.create.and.returnValue(cold('--|'));
      const expected = cold('a', { a: 'loading' });

      store.create(params);

      expect(store.status$).toBeObservable(expected);
      expect(mockExaminationService.create).toHaveBeenCalled();
    });

    it('[Create successful] should navigate to created examination', fakeAsync(() => {
      const navigateSpy = spyOn(router, 'navigateByUrl');
      const getUserInfoSpy = spyOn(appStore, 'dispatch');

      mockExaminationService.create.and.returnValue(
        of(
          ResultBuilder.success({
            id: 'mock-id',
            displayId: 'Mock display ID',
            name: 'Mock name',
            description: 'Mock description',
            expectStartAt: params.expectStartAt,
            expectEndAt: params.expectEndAt,
            status: ExaminationStatus.Idle,
            createdAt: new Date(),
            updatedAt: null,
            createdBy: {
              id: 'Mock',
              invigilatorId: 'Mock',
              fullName: 'Mock',
              email: 'Mock',
              createdAt: new Date(2023, 1, 1),
              department: null,
              role: 'ExaminationDepartmentHead' as any,
              isMale: true,
            },
          })
        )
      );

      store.create(params);

      expect(navigateSpy).toHaveBeenCalledWith('mock-id/exam/data');
    }));

    it('[Error] should patch state `error`', fakeAsync(() => {
      mockExaminationService.create.and.returnValue(cold('--#'));
      const expected = cold('a-b', { a: 'loading', b: 'error' });

      store.create(params);

      expect(store.status$).toBeObservable(expected);
    }));
  });
});
