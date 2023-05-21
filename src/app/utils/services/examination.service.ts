import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result, ResultBuilder } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import {
  AssignInvigilatorNumerateOfShiftToFacultyResponse,
  AssignInvigilatorsToShiftsRequest,
  ChangeExaminationStatusRequest,
  CreateExaminationRequest,
  ExaminationEvent,
  ExaminationGetDataResponseItem,
  ExaminationGetShiftResponseItem,
  ExaminationSummary,
  GetAllGroupsResponseResponseItem,
  GetAvailableInvigilatorsInShiftGroupResponseItem,
  GetGroupByFacultyIdResponseItem,
  GetHandoverDataResponseItem,
  GetRelatedResponseItem,
  TemporaryExamination,
  UpdateExaminationRequest,
  UpdateShiftRequest,
  UpdateTeacherAssignmentRequest,
  UserSummary,
} from '@esm/data';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExaminationService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl + 'examination/';

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
  getData(id: string): Observable<Result<ExaminationGetDataResponseItem[]>> {
    return this.http.get<Result<ExaminationGetDataResponseItem[]>>(
      this.url + id
    );
  }

  // [POST] /examination/{examinationId}
  import(id: string, formData: FormData): Observable<Result<boolean>> {
    return this.http.post<Result<boolean>>(this.url + id, formData);
  }

  // [PATCH] /examination/{examinationId}
  update(
    id: string,
    request: UpdateExaminationRequest
  ): Observable<Result<ExaminationSummary>> {
    return this.http.patch<Result<ExaminationSummary>>(this.url + id, request);
  }

  // [GET] /examination/{examinationId}/events
  getEvents(id: string): Observable<Result<ExaminationEvent>> {
    return this.http.get<Result<ExaminationEvent>>(this.url + `${id}/events`);
  }

  // [GET] /examination/{examinationId}/handover
  getHandoverData(
    id: string
  ): Observable<Result<GetHandoverDataResponseItem[]>> {
    return this.http.get<Result<GetHandoverDataResponseItem[]>>(
      this.url + `${id}/handover`
    );
  }

  // [GET] /examination/{examinationId}/handover/{shiftId}/report
  updateShift(
    id: string,
    shiftId: string,
    request: UpdateShiftRequest
  ): Observable<Result<boolean>> {
    return this.http.patch<Result<boolean>>(
      this.url + `${id}/shift/${shiftId}`,
      request
    );
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

  // [PATCH] /examination/{examinationId}/shift/calculate
  autoAssignTeacherToShifts(id: string): Observable<Result<true>> {
    return this.http.post<Result<true>>(this.url + `${id}/shift/calculate`, {});
  }

  // [POST] /examination/{examinationId}/status
  changeStatus(
    id: string,
    request: ChangeExaminationStatusRequest
  ): Observable<Result<boolean>> {
    return this.http.post<Result<boolean>>(this.url + `${id}/status`, request);
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

  // [POST] /examination/{examinationId}/faculty/{facultyId}/group/calculate
  autoAssignTeacherToShiftGroups(
    id: string,
    facultyId: string
  ): Observable<Result<true>> {
    return this.http.post<Result<true>>(
      this.url + `${id}/faculty/${facultyId}/group/calculate`,
      {}
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

  // [POST] /examination/{examinationId}/group/calculate
  calculate(id: string): Observable<Result<boolean>> {
    return this.http.post<Result<boolean>>(
      this.url + id + '/group/calculate',
      {}
    );
  }

  // [POST] /examination/{examinationId}/group/{groupId}/department/{departmentId}
  updateTemporaryTeacher(
    examinationId: string,
    groupId: string,
    departmentId: string,
    userId: string
  ): Observable<Result<AssignInvigilatorNumerateOfShiftToFacultyResponse>> {
    return this.http.post<
      Result<AssignInvigilatorNumerateOfShiftToFacultyResponse>
    >(
      `${this.url}${examinationId}/group/${groupId}/department/${departmentId}`,
      { userId }
    );
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

  // [POST] /examination/{examinationId}/invigilator
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
