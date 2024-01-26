import { InjectionToken, ValueProvider } from '@angular/core';

export interface TopBarOptions {
  readonly showInfo: boolean;
}

const TOP_BAR_DEFAULT_OPTIONS: TopBarOptions = {
  showInfo: true,
};

export const TOP_BAR_OPTIONS = new InjectionToken('top-bar', {
  factory: (): TopBarOptions => TOP_BAR_DEFAULT_OPTIONS,
});

export const topBarOptionsProvider: (
  options: Partial<TopBarOptions>,
) => ValueProvider = (options: Partial<TopBarOptions>) => ({
  provide: TOP_BAR_OPTIONS,
  useValue: { ...TOP_BAR_DEFAULT_OPTIONS, ...options },
});
