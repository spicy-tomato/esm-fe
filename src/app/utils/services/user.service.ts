import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import { SearchParams, UpdateUserRequest, UserSummary } from '@esm/data';
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

  // [GET] /user/search
  search(params: SearchParams): Observable<Result<UserSummary[]>> {
    return this.http.get<Result<UserSummary[]>>(this.url + 'search', {
      params,
    });
  }

  // [PUT] /user/{userId}
  update(
    userId: string,
    request: UpdateUserRequest
  ): Observable<Result<UserSummary>> {
    return this.http.put<Result<UserSummary>>(this.url + userId, request);
  }
}
