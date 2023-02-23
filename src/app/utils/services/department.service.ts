import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { AppEnv, APP_ENV } from '@esm/core';
import {
  DepartmentSummary,
  EditDepartmentRequest,
  FacultyWithDepartments,
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

  // PUBLIC METHODS
  getAll(): Observable<Result<FacultyWithDepartments[]>> {
    return this.http.get<Result<FacultyWithDepartments[]>>(this.url);
  }

  create(
    request: EditDepartmentRequest
  ): Observable<Result<DepartmentSummary>> {
    return this.http.post<Result<DepartmentSummary>>(this.url, request);
  }

  update(
    departmentId: string,
    request: EditDepartmentRequest
  ): Observable<Result<DepartmentSummary>> {
    return this.http.put<Result<DepartmentSummary>>(
      this.url + departmentId,
      request
    );
  }
}
