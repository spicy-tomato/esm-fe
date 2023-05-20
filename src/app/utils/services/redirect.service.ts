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

    this.router
      .navigate(['/login'], {
        queryParams: { redirect: redirect ?? null },
      })
      .then(() => null);
  }

  app(redirect?: string | null): void {
    if (redirect) {
      this.router.navigate([redirect]).then(() => null);
      return;
    }

    this.router.navigate(['/']).then(() => null);
  }

  permissionDenied(): void {
    this.router.navigate(['/403']).then(() => null);
  }

  notFound(): void {
    this.router.navigate(['/404']).then(() => null);
  }
}
