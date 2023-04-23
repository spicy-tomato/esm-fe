import { inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ObservableHelper } from '@esm/cdk';
import { Store } from '@ngrx/store';
import { map, Observable, ReplaySubject, takeUntil } from 'rxjs';
import { AppSelector } from '../store/app.selectors';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard
  extends ReplaySubject<void>
  implements CanActivate, OnDestroy
{
  // INJECT PROPERTIES
  private readonly router = inject(Router);
  private readonly appStore = inject(Store<AppState>);

  // PRIVATE PROPERTIES
  private readonly user$ = this.appStore
    .select(AppSelector.user)
    .pipe(takeUntil(this));

  // CONSTRUCTOR
  constructor() {
    super(1);
  }

  // LIFECYCLE
  ngOnDestroy(): void {
    this.next();
    this.complete();
  }

  // IMPLEMENTATIONS
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.user$.pipe(
      ObservableHelper.filterNullish(),
      map(({ role }) => {
        const acceptRoles = route.data['roles'] as string[] | undefined;

        if (!acceptRoles || acceptRoles.length === 0) {
          return true;
        }

        if (acceptRoles && acceptRoles.includes(role)) {
          return true;
        }

        const redirect = route.data['redirect'] as string;
        this.router.navigate([redirect ?? '/403']);

        return false;
      }),
      takeUntil(this)
    );
  }
}
