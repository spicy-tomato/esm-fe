import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { AppEnv, APP_ENV } from '@esm/core';
import {
  CreateUserRequest,
  DepartmentSummary,
  EditDepartmentRequest,
  FacultyWithDepartments,
  UserSummary,
} from '@esm/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  // PRIVATE PROPERTIES
  private readonly url: string;

  // CONSTRUCTOR
  constructor(private readonly http: HttpClient, @Inject(APP_ENV) env: AppEnv) {
    this.url = env.baseUrl + 'department/';
  }

  // [GET] /department
  getAll(): Observable<Result<FacultyWithDepartments[]>> {
    return this.http.get<Result<FacultyWithDepartments[]>>(this.url);
  }

  // [POST] /department
  create(
    request: EditDepartmentRequest
  ): Observable<Result<DepartmentSummary>> {
    return this.http.post<Result<DepartmentSummary>>(this.url, request);
  }

  // [PUT] /department/{departmentId}
  update(
    departmentId: string,
    request: EditDepartmentRequest
  ): Observable<Result<DepartmentSummary>> {
    return this.http.put<Result<DepartmentSummary>>(
      this.url + departmentId,
      request
    );
  }

  // [POST] /department/{departmentId}/user
  createUser(
    departmentId: string,
    request: CreateUserRequest
  ): Observable<Result<UserSummary>> {
    return this.http.post<Result<UserSummary>>(
      this.url + departmentId + '/user',
      request
    );
  }
}
