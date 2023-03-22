import { InjectionToken } from '@angular/core';

export interface AppEnv {
  production: boolean;
  baseUrl: string;
  SYNCFUSION_LICENSE: string;
}

export const APP_ENV = new InjectionToken<AppEnv>('app.env');
