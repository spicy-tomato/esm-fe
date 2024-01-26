import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import {
  CreateUserRequest,
  DepartmentSummary,
  EditDepartmentRequest,
  UserSummary,
} from '@esm/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  // INJECT PROPERTIES
  private readonly env = inject(APP_ENV);
  private readonly http = inject(HttpClient);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl + 'department/';

  // [POST] /department
  create(
    request: EditDepartmentRequest,
  ): Observable<Result<DepartmentSummary>> {
    return this.http.post<Result<DepartmentSummary>>(this.url, request);
  }

  // [PUT] /department/{departmentId}
  update(
    departmentId: string,
    request: EditDepartmentRequest,
  ): Observable<Result<DepartmentSummary>> {
    return this.http.put<Result<DepartmentSummary>>(
      this.url + departmentId,
      request,
    );
  }

  // [POST] /department/{departmentId}/user
  createUser(
    departmentId: string,
    request: CreateUserRequest,
  ): Observable<Result<UserSummary>> {
    return this.http.post<Result<UserSummary>>(
      this.url + departmentId + '/user',
      request,
    );
  }
}
