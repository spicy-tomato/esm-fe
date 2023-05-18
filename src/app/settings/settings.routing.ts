import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SettingsChangePasswordComponent } from './change-password/change-password.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: SettingsComponent,
  },
  {
    path: 'change-password',
    component: SettingsChangePasswordComponent,
  },
];
