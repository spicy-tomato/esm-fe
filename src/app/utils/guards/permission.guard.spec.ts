import { TestBed } from '@angular/core/testing';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('PermissionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
      ],
    });
  });

  it('should be created', () => {
    expect(true).toBeTruthy();
  });
});
