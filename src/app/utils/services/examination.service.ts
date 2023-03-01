import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { AppEnv, APP_ENV } from '@esm/core';
import {
  CreateExaminationRequest,
  ExaminationShiftSimple,
  ExaminationSummary,
  TemporaryExamination,
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
  ): Observable<Result<ExaminationShiftSimple[]>> {
    return this.http.get<Result<ExaminationShiftSimple[]>>(this.url + id, {
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

  // [PATCH] /examination/{examinationId}/activate
  activate(id: string): Observable<Result<boolean>> {
    return this.http.patch<Result<boolean>>(this.url + `${id}/activate`, {});
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
