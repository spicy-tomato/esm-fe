import { fakeAsync, TestBed } from '@angular/core/testing';
import { ResultBuilder, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import { ExaminationService } from '@esm/api';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { ExaminationDataImportStore } from './import.store';

describe('ExaminationDataImportStore', () => {
  let store: ExaminationDataImportStore;
  let mockExaminationService: jasmine.SpyObj<ExaminationService>;

  beforeEach(async () => {
    mockExaminationService = jasmine.createSpyObj<ExaminationService>(
      'ExaminationService',
      ['import'],
    );

    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [
        ExaminationDataImportStore,
        {
          provide: ExaminationService,
          useValue: mockExaminationService,
        },
        { provide: APP_ENV, useValue: {} },
        provideMockStore({
          initialState: {
            [appFeatureKey]: { ...appInitialState, examinationId: 'mock-id' },
          },
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(ExaminationDataImportStore);
  });

  it('should have initial state', () => {
    const expected = cold('a', { a: 'idle' });
    expect(store.status$).toBeObservable(expected);
  });

  describe('Effect import', () => {
    const params = new FormData();

    it('[Called] should patch state `loading`', () => {
      const expected = cold('a', { a: 'loading' });
      mockExaminationService.import.and.returnValue(cold('--|'));

      store.import(params);

      expect(store.status$).toBeObservable(expected);
      expect(mockExaminationService.import).toHaveBeenCalled();
    });

    it('[Create successful] should patch state `success`', fakeAsync(() => {
      const expected = cold('a-b', { a: 'loading', b: 'success' });
      mockExaminationService.import.and.returnValue(
        cold('--a', { a: ResultBuilder.success() }),
      );

      store.import(params);

      expect(store.status$).toBeObservable(expected);
    }));

    it('[Error] should patch state `error`', fakeAsync(() => {
      mockExaminationService.import.and.returnValue(cold('--#'));
      const expected = cold('a-b', { a: 'loading', b: 'error' });

      store.import(params);

      expect(store.status$).toBeObservable(expected);
    }));
  });

  describe('Effect clearRejected', () => {
    it('[Called] should patch state `idle`', () => {
      const expected = cold('a', { a: 'idle' });
      store.clearRejected();
      expect(store.status$).toBeObservable(expected);
    });
  });
});
