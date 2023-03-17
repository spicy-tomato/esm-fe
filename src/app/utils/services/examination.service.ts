import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Result, ResultBuilder } from '@esm/cdk';
import { AppEnv, APP_ENV } from '@esm/core';
import {
  AssignInvigilatorNumerateOfShiftToFacultyResponse,
  CreateExaminationRequest,
  ExaminationGetDataResponseItem,
  ExaminationGetShiftResponseItem,
  ExaminationStatus,
  ExaminationSummary,
  GetAllGroupsResponseResponseItem,
  GetAvailableInvigilatorsInShiftGroupResponseItem,
  GetGroupByFacultyIdResponseItem,
  GetRelatedResponseItem,
  TemporaryExamination,
  AssignInvigilatorsToShiftsRequest,
  UpdateTeacherAssignmentRequest,
  UserSummary,
} from '@esm/data';
import { map, Observable } from 'rxjs';

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
  getRelated(isActive?: boolean): Observable<Result<GetRelatedResponseItem[]>> {
    return this.http.get<Result<GetRelatedResponseItem[]>>(
      this.url + 'related',
      {
        params: isActive !== undefined ? { isActive } : {},
      }
    );
  }

  // [GET] /examination/{examinationId}
  getData(
    id: string,
    departmentAssign?: boolean
  ): Observable<Result<ExaminationGetDataResponseItem[]>> {
    return this.http.get<Result<ExaminationGetDataResponseItem[]>>(
      this.url + id,
      {
        params: departmentAssign !== undefined ? { departmentAssign } : {},
      }
    );
  }

  // [POST] /examination/{examinationId}
  import(id: string, formData: FormData): Observable<Result<boolean>> {
    return this.http.post<Result<boolean>>(this.url + id, formData);
  }

  // [GET] /examination/{examinationId}/shift
  getShifts(id: string): Observable<Result<ExaminationGetShiftResponseItem[]>> {
    return this.http.get<Result<ExaminationGetShiftResponseItem[]>>(
      this.url + `${id}/shift`
    );
  }

  // [PATCH] /examination/{examinationId}/shift
  assignInvigilatorsToShifts(
    id: string,
    params: AssignInvigilatorsToShiftsRequest
  ): Observable<Result<true>> {
    return this.http.patch<Result<true>>(this.url + `${id}/shift`, params);
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
  ): Observable<Result<GetGroupByFacultyIdResponseItem[]>> {
    return this.http
      .get<Result<GetGroupByFacultyIdResponseItem[]>>(
        this.url + `${id}/faculty/${facultyId}/group`
      )
      .pipe(
        map((x) =>
          ResultBuilder.success(
            x.data.map((d) =>
              d.user
                ? {
                    ...d,
                    user: Object.assign(new UserSummary(), d.user),
                  }
                : d
            )
          )
        )
      );
  }

  // [POST] /examination/{examinationId}/faculty/{facultyId}/group
  updateTeacherAssignment(
    id: string,
    facultyId: string,
    params: UpdateTeacherAssignmentRequest
  ): Observable<Result<true>> {
    return this.http.post<Result<true>>(
      this.url + `${id}/faculty/${facultyId}/group`,
      params
    );
  }

  // [GET] /examination/{examinationId}/group
  getAllGroups(
    id: string
  ): Observable<Result<GetAllGroupsResponseResponseItem[]>> {
    return this.http.get<Result<GetAllGroupsResponseResponseItem[]>>(
      this.url + id + '/group'
    );
  }

  // [POST] /examination/{examinationId}/group
  calculate(id: string): Observable<Result<boolean>> {
    return this.http.post<Result<boolean>>(this.url + id + '/group', {});
  }

  // [POST] /examination/{examinationId}/group/{groupId}/{facultyId}
  assignInvigilatorNumerateOfShiftToFaculty(
    examinationId: string,
    groupId: string,
    facultyId: string,
    numberOfInvigilator: number
  ): Observable<Result<AssignInvigilatorNumerateOfShiftToFacultyResponse>> {
    return this.http.post<
      Result<AssignInvigilatorNumerateOfShiftToFacultyResponse>
    >(
      `${this.url}${examinationId}/group/${groupId}/${facultyId}`,
      numberOfInvigilator
    );
  }

  // [POST] /examination/{examinationId}/group/{groupId}/{facultyId}
  getAvailableInvigilatorsInShiftGroup(
    examinationId: string
  ): Observable<Result<GetAvailableInvigilatorsInShiftGroupResponseItem>> {
    return this.http.get<
      Result<GetAvailableInvigilatorsInShiftGroupResponseItem>
    >(`${this.url}${examinationId}/invigilator`);
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
