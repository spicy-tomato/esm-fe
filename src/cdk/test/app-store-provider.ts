import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';

export const APP_STORE_PROVIDER = [
  provideMockStore({
    initialState: {
      [appFeatureKey]: appInitialState,
    },
  }),
  { provide: APP_ENV, useValue: {} },
];
