import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import {
  ChangePasswordRequest,
  CheckIfExistParams,
  GeneratedToken,
  LoginRequest,
  SearchParams,
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
  getAllInvigilators(
    search: 'isInvigilator' | 'isFaculty'
  ): Observable<Result<UserSummary[]>> {
    return this.http.get<Result<UserSummary[]>>(this.url, {
      params: { [search]: true },
    });
  }

  // [PATCH] /user/change-password
  changePassword(request: ChangePasswordRequest): Observable<Result<void>> {
    return this.http.patch<Result<void>>(this.url + 'change-password', request);
  }

  // [PUT] /user/check-exist
  checkIfExist(params: CheckIfExistParams): Observable<Result<UserSummary>> {
    return this.http.get<Result<UserSummary>>(this.url + 'check-if-exist', {
      params,
    });
  }

  // [POST] /user/login
  login(request: LoginRequest): Observable<Result<GeneratedToken>> {
    return this.http.post<Result<GeneratedToken>>(this.url + 'login', request);
  }

  // [PATCH] /user/reset-password
  resetPassword(userId: string): Observable<Result<void>> {
    return this.http.patch<Result<void>>(
      this.url + 'reset-password',
      {},
      { params: { userId } }
    );
  }

  // [GET] /user/search
  search(params: SearchParams): Observable<Result<UserSummary[]>> {
    return this.http.get<Result<UserSummary[]>>(this.url + 'search', {
      params,
    });
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
