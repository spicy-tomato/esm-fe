import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '@esm/cdk';
import { RedirectService } from '../services/redirect.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // INJECT PROPERTIES
  private readonly tokenService = inject(TokenService);
  private readonly redirectService = inject(RedirectService);

  // IMPLEMENTATIONS
  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const path = state.url;
    const isLoginPath = path.includes('login');
    const hasAccessToken = !!this.tokenService.get();

    if (!hasAccessToken) {
      if (isLoginPath) {
        return true;
      }

      this.redirectService.login(path);
      return false;
    }

    // If have access token
    if (!isLoginPath) {
      return true;
    }

    this.redirectService.app();
    return false;
  }
}
