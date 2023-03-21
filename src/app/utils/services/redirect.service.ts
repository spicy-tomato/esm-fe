import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  // INJECT PROPERTIES
  private readonly router = inject(Router);

  login(redirect?: string): void {
    if (redirect?.includes('/login')) {
      redirect = '';
    }
    void this.router.navigate(['/login'], {
      queryParams: { redirect: redirect || null },
    });
  }

  app(redirect?: string | null): void {
    if (redirect) {
      void this.router.navigate([redirect]);
      return;
    }

    void this.router.navigate(['/']);
  }
}
