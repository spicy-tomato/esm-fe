import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ObservableHelper } from '@esm/cdk';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppSelector } from '../store/app.selectors';
import { AppState } from '../store/app.state';

export const permissionGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const appStore = inject(Store<AppState>);

  const user$ = appStore.select(AppSelector.user);

  return user$.pipe(
    ObservableHelper.filterNullish(),
    map(({ roles }) => {
      const acceptRoles = route.data['roles'] as string[] | undefined;

      if (!acceptRoles || acceptRoles.length === 0) {
        return true;
      }

      if (acceptRoles.find(r => roles.includes(r))) {
        return true;
      }

      const redirect = route.data['redirect'] as string;
      router.navigate([redirect ?? '/403']).catch(() => null);

      return false;
    })
  );
};
