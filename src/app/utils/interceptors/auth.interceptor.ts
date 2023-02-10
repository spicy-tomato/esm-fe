import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '@esm/cdk';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // CONSTRUCTOR
  constructor(private readonly tokenService: TokenService) {}

  // IMPLEMENTATIONS
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.get() || '';
    const headers = req.headers.set('Authorization', `Bearer ${token}`);
    const authReq = req.clone({ headers });

    return next.handle(authReq);
  }
}
