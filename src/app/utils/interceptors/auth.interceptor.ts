import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '@esm/cdk';
import { Location } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { RedirectService } from '@esm/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // CONSTRUCTOR
  constructor(
    private readonly tokenService: TokenService,
    private readonly location: Location,
    private readonly redirectService: RedirectService,
  ) {}

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
