import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Result, ResultBuilder } from '@esm/cdk';
import { AppEnv, APP_ENV } from '@esm/core';
import {
  CreateModuleRequest,
  EditFacultyRequest,
  FacultyGetAllResponseItem,
  FacultySummary,
  ModuleSimple,
  UserSummary,
} from '@esm/data';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  // PRIVATE PROPERTIES
  private readonly url: string;

  // CONSTRUCTOR
  constructor(private readonly http: HttpClient, @Inject(APP_ENV) env: AppEnv) {
    this.url = env.baseUrl + 'faculty/';
  }

  // [GET] /department
  getAll(): Observable<Result<FacultyGetAllResponseItem[]>> {
    return this.http.get<Result<FacultyGetAllResponseItem[]>>(this.url);
  }

  // [GET] /faculty
  create(request: EditFacultyRequest): Observable<Result<FacultySummary>> {
    return this.http.post<Result<FacultySummary>>(this.url, request);
  }

  // [PUT] /faculty/{facultyId}
  update(
    facultyId: string,
    request: EditFacultyRequest
  ): Observable<Result<FacultySummary>> {
    return this.http.put<Result<FacultySummary>>(this.url + facultyId, request);
  }

  // [POST] /faculty/{facultyId}/module
  createModule(
    facultyId: string,
    request: CreateModuleRequest
  ): Observable<Result<ModuleSimple>> {
    return this.http.post<Result<ModuleSimple>>(
      this.url + facultyId + '/module',
      request
    );
  }

  // [GET] /faculty/{facultyId}/user
  getUsers(facultyId: string): Observable<Result<UserSummary[]>> {
    return this.http
      .get<Result<UserSummary[]>>(this.url + facultyId + '/user')
      .pipe(
        map((x) =>
          ResultBuilder.success(
            x.data.map((d) => Object.assign(new UserSummary(), d))
          )
        )
      );
  }
}
