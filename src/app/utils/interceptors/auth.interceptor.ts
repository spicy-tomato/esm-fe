import { Location } from '@angular/common';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from '@esm/cdk';
import { RedirectService } from '@esm/services';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // INJECT PROPERTIES
  private readonly location = inject(Location);
  private readonly tokenService = inject(TokenService);
  private readonly redirectService = inject(RedirectService);

  // IMPLEMENTATIONS
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.get() || '';
    const headers = req.headers.set('Authorization', `Bearer ${token}`);
    const authReq = req.clone({ headers });

    return next.handle(authReq).pipe(
      tap({
        error: (error) => {
          if (!(error instanceof HttpErrorResponse)) return;
          const currentUrl = this.location.path();

          switch (error.status) {
            case 401: {
              const token = error.headers.get('Authorization');
              if (token) {
                this.tokenService.save(token);
              } else if (!currentUrl.includes('login')) {
                this.tokenService.clear();
                this.redirectService.login(currentUrl);
              }
            }
          }
        },
      })
    );
  }
}
