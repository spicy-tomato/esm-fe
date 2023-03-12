import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { AppEnv, APP_ENV } from '@esm/core';
import {
  CreateExaminationRequest,
  ShiftGroupSimple,
  ShiftSimple,
  ExaminationStatus,
  ExaminationSummary,
  TemporaryExamination,
  DepartmentShiftGroupSimple,
} from '@esm/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExaminationService {
  // PRIVATE PROPERTIES
  private readonly url: string;

  // CONSTRUCTOR
  constructor(private readonly http: HttpClient, @Inject(APP_ENV) env: AppEnv) {
    this.url = env.baseUrl + 'examination/';
  }

  // [POST] /examination
  create(
    request: CreateExaminationRequest
  ): Observable<Result<ExaminationSummary>> {
    return this.http.post<Result<ExaminationSummary>>(this.url, request);
  }

  // [GET] /examination/related
  getRelated(isActive?: boolean): Observable<Result<ExaminationSummary[]>> {
    return this.http.get<Result<ExaminationSummary[]>>(this.url + 'related', {
      params: isActive !== undefined ? { isActive } : {},
    });
  }

  // [GET] /examination/{examinationId}
  getData(
    id: string,
    departmentAssign?: boolean
  ): Observable<Result<ShiftSimple[]>> {
    return this.http.get<Result<ShiftSimple[]>>(this.url + id, {
      params: departmentAssign
        ? {
            departmentAssign,
          }
        : {},
    });
  }

  // [POST] /examination/{examinationId}
  import(id: string, formData: FormData): Observable<Result<boolean>> {
    return this.http.post<Result<boolean>>(this.url + id, formData);
  }

  // [POST] /examination/{examinationId}/status
  changeStatus(
    id: string,
    status: ExaminationStatus
  ): Observable<Result<boolean>> {
    return this.http.post<Result<boolean>>(this.url + `${id}/status`, status);
  }

  // [PATCH] /examination/{examinationId}/exams-number
  updateExamsNumber(
    id: string,
    params: Record<string, number>
  ): Observable<Result<boolean>> {
    return this.http.patch<Result<boolean>>(
      this.url + `${id}/exams-number`,
      params
    );
  }

  // [GET] /examination/{examinationId}/faculty/{facultyId}/group
  getGroupsByFacultyId(
    id: string,
    facultyId: string
  ): Observable<Result<DepartmentShiftGroupSimple[]>> {
    return this.http.get<Result<DepartmentShiftGroupSimple[]>>(
      this.url + `${id}/faculty/${facultyId}/group`
    );
  }

  // [GET] /examination/{examinationId}/group
  getAllGroups(id: string): Observable<Result<ShiftGroupSimple[]>> {
    return this.http.get<Result<ShiftGroupSimple[]>>(this.url + id + '/group');
  }

  // [POST] /examination/{examinationId}/group
  calculate(id: string): Observable<Result<ShiftGroupSimple[]>> {
    return this.http.post<Result<ShiftGroupSimple[]>>(
      this.url + id + '/group',
      {}
    );
  }

  // [POST] /examination/{examinationId}/group/{groupId}/{facultyId}
  assignInvigilatorNumerateOfShiftToFaculty(
    examinationId: string,
    groupId: string,
    facultyId: string,
    numberOfInvigilator: number
  ): Observable<Result<ShiftGroupSimple>> {
    return this.http.post<Result<ShiftGroupSimple>>(
      `${this.url}${examinationId}/group/${groupId}/${facultyId}`,
      numberOfInvigilator
    );
  }

  // [GET] /examination/{examinationId}/summary
  getSummary(id: string): Observable<Result<ExaminationSummary>> {
    return this.http.get<Result<ExaminationSummary>>(
      this.url + `${id}/summary`
    );
  }

  // [GET] /examination/{examinationId}/temporary
  getTemporaryData(id: string): Observable<Result<TemporaryExamination[]>> {
    return this.http.get<Result<TemporaryExamination[]>>(
      this.url + id + '/temporary'
    );
  }
}
