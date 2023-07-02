import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import {
  ChangePasswordRequest,
  GeneratedToken,
  LoginRequest,
  MySummaryInfoResponse,
} from '@esm/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl + 'auth/';

  // [PATCH] /auth/change-password
  changePassword(request: ChangePasswordRequest): Observable<Result<void>> {
    return this.http.patch<Result<void>>(this.url + 'change-password', request);
  }

  // [POST] /auth/login
  login(request: LoginRequest): Observable<Result<GeneratedToken>> {
    return this.http.post<Result<GeneratedToken>>(this.url + 'login', request);
  }

  // [GET] /auth/me
  getMySummaryInfo(): Observable<Result<MySummaryInfoResponse>> {
    return this.http.get<Result<MySummaryInfoResponse>>(this.url + 'me');
  }

  // [PATCH] /auth/reset-password
  resetPassword(userId: string): Observable<Result<void>> {
    return this.http.patch<Result<void>>(
      this.url + 'reset-password',
      {},
      { params: { userId } }
    );
  }
}
