import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEnv, APP_ENV } from 'src/core/config';
import { Result } from 'src/cdk/models';
import { GeneratedToken, UserSummary } from 'src/data/models';
import { LoginRequest } from 'src/data/requests';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // PRIVATE PROPERTIES
  private readonly url: string;

  // CONSTRUCTOR
  constructor(private readonly http: HttpClient, @Inject(APP_ENV) env: AppEnv) {
    this.url = env.baseUrl + 'user/';
  }

  // PUBLIC METHODS
  register(request: LoginRequest): Observable<Result<GeneratedToken>> {
    return this.http.post<Result<GeneratedToken>>(this.url, request);
  }

  login(request: LoginRequest): Observable<Result<GeneratedToken>> {
    return this.http.post<Result<GeneratedToken>>(this.url + 'login', request);
  }

  me(): Observable<Result<UserSummary>> {
    return this.http.get<Result<UserSummary>>(this.url + 'me');
  }

  getByUserName(userName: string): Observable<Result<UserSummary>> {
    return this.http.get<Result<UserSummary>>(this.url + userName);
  }

  checkExist(
    data: string,
    type: 'userName' | 'email'
  ): Observable<Result<boolean>> {
    return this.http.get<Result<boolean>>(this.url + 'check-exist', {
      params: { [type]: data },
    });
  }
}
