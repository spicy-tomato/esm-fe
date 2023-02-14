import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  // CONSTRUCTOR
  constructor(private readonly router: Router) {}

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
