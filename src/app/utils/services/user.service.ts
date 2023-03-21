import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import {
  GeneratedToken,
  LoginRequest,
  UpdateUserRequest,
  UserSummary,
} from '@esm/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl + 'user/';

  // [GET] /user
  getAllInvigilators(): Observable<Result<UserSummary[]>> {
    return this.http.get<Result<UserSummary[]>>(this.url, {
      params: {
        isInvigilator: true,
      },
    });
  }

  // [POST] /user/login
  login(request: LoginRequest): Observable<Result<GeneratedToken>> {
    return this.http.post<Result<GeneratedToken>>(this.url + 'login', request);
  }

  // [GET] /user/summary
  me(): Observable<Result<UserSummary>> {
    return this.http.get<Result<UserSummary>>(this.url + 'summary');
  }

  // [GET] /user/{userId}
  getByUserName(userName: string): Observable<Result<UserSummary>> {
    return this.http.get<Result<UserSummary>>(this.url + userName);
  }

  // [PUT] /user/{userId}
  update(
    userId: string,
    request: UpdateUserRequest
  ): Observable<Result<UserSummary>> {
    return this.http.put<Result<UserSummary>>(this.url + userId, request);
  }
}
