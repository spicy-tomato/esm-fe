import { InjectionToken } from '@angular/core';

export interface AppEnv {
  production: boolean;
  baseUrl: string;
}

export const APP_ENV = new InjectionToken<AppEnv>('app.env');
