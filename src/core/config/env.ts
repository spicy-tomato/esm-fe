import { InjectionToken } from '@angular/core';

export interface AppEnv {
  production: boolean;
  baseUrl: string;
  syncfusionLicense: string;
  recaptcha: {
    siteKey: string;
  };
  defaultPassword: string;
}

export const APP_ENV = new InjectionToken<AppEnv>('app.env');
