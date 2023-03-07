import { TestBed } from '@angular/core/testing';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { PermissionGuard } from './permission.guard';

describe('PermissionGuard', () => {
  let guard: PermissionGuard;

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
    guard = TestBed.inject(PermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
