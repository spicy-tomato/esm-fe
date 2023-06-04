import { fakeAsync, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { ExaminationService } from '@esm/services';
import { cold } from 'jasmine-marbles';
import { HomeStore } from './home.store';

describe('HomeStore', () => {
  let store: HomeStore;
  let mockExaminationService: jasmine.SpyObj<ExaminationService>;

  beforeEach(async () => {
    mockExaminationService = jasmine.createSpyObj<ExaminationService>(
      'ExaminationService',
      ['getRelated']
    );

    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [
        APP_STORE_PROVIDER,
        HomeStore,
        {
          provide: ExaminationService,
          useValue: mockExaminationService,
        },
      ],
    }).compileComponents();

    store = TestBed.inject(HomeStore);
  });

  describe('Effect getClosedExaminations', () => {
    it('[Called] should patch state `loading`', () => {
      mockExaminationService.getRelated.and.returnValue(cold('--|'));
      const expected = cold('a', { a: 'loading' });

      store.getClosedExaminations();

      expect(store.closedExaminationsStatus$).toBeObservable(expected);
      expect(mockExaminationService.getRelated).toHaveBeenCalled();
    });

    it('[Create successful] should navigate to created examination', fakeAsync(() => {
      mockExaminationService.getRelated.and.returnValue(cold('--a'));
      const expected = cold('a-b', { a: 'loading', b: 'success' });

      store.getClosedExaminations();

      expect(store.closedExaminationsStatus$).toBeObservable(expected);
    }));

    it('[Error] should patch state `error`', fakeAsync(() => {
      mockExaminationService.getRelated.and.returnValue(cold('--#'));
      const expected = cold('a-b', { a: 'loading', b: 'error' });

      store.getClosedExaminations();

      expect(store.closedExaminationsStatus$).toBeObservable(expected);
    }));
  });
});
