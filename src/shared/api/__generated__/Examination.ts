/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ObjectHelper } from "@esm/cdk";
import { APP_ENV } from "@esm/core";
import { Observable } from "rxjs";
import {
  AssignInvigilatorNumerateOfShiftToFacultyData,
  AssignInvigilatorNumerateOfShiftToFacultyPayload,
  AssignInvigilatorsToShiftsData,
  AssignInvigilatorsToShiftsPayload,
  AutoAssignTeachersToGroupsData,
  AutoAssignTeachersToShiftData,
  CalculateInvigilatorNumerateOfShiftForEachFacultyData,
  ChangeStatusData,
  ChangeStatusPayload,
  CreateExaminationData,
  CreateExaminationPayload,
  GetAllGroupsData,
  GetAllShiftsData,
  GetAvailableInvigilatorsInShiftGroupData,
  GetEventsData,
  GetGroupsByFacultyIdData,
  GetHandoverDataData,
  GetRelatedData,
  GetRelatedParams,
  GetShiftsData,
  GetSummaryData,
  GetTemporaryDataData,
  ImportExaminationData,
  ImportExaminationPayload,
  UpdateExaminationData,
  UpdateExaminationPayload,
  UpdateExamsCountData,
  UpdateExamsCountPayload,
  UpdateShiftExaminationData,
  UpdateShiftExaminationPayload,
  UpdateTeacherAssignmentData,
  UpdateTeacherAssignmentPayload,
  UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupData,
  UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupPayload,
} from "./data-contracts";

@Injectable({
  providedIn: "root",
})
export class ExaminationService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Examination
   * @name CreateExamination
   * @request POST:/Examination
   * @response `200` `CreateExaminationData` Success
   */
  createExamination(data: CreateExaminationPayload): Observable<CreateExaminationData> {
    return this.http.post<CreateExaminationData>(this.url + `/Examination`, data);
  }
  /**
   * No description
   *
   * @tags Examination
   * @name GetRelated
   * @request GET:/Examination/related
   * @response `200` `GetRelatedData` Success
   */
  getRelated(query: GetRelatedParams): Observable<GetRelatedData> {
    return this.http.get<GetRelatedData>(this.url + `/Examination/related`, {
      params: ObjectHelper.removeUndefinedField(query),
    });
  }
  /**
   * No description
   *
   * @tags Examination
   * @name GetAllShifts
   * @request GET:/Examination/{examinationId}
   * @response `200` `GetAllShiftsData` Success
   */
  getAllShifts(examinationId: string): Observable<GetAllShiftsData> {
    return this.http.get<GetAllShiftsData>(this.url + `/Examination/${examinationId}`);
  }
  /**
   * No description
   *
   * @tags Examination
   * @name ImportExamination
   * @request POST:/Examination/{examinationId}
   * @response `200` `ImportExaminationData` Success
   */
  importExamination(examinationId: string, data: ImportExaminationPayload): Observable<ImportExaminationData> {
    return this.http.post<ImportExaminationData>(this.url + `/Examination/${examinationId}`, data);
  }
  /**
   * No description
   *
   * @tags Examination
   * @name UpdateExamination
   * @request PATCH:/Examination/{examinationId}
   * @response `200` `UpdateExaminationData` Success
   */
  updateExamination(examinationId: string, data: UpdateExaminationPayload): Observable<UpdateExaminationData> {
    return this.http.patch<UpdateExaminationData>(this.url + `/Examination/${examinationId}`, data);
  }
  /**
   * No description
   *
   * @tags Examination
   * @name GetEvents
   * @request GET:/Examination/{examinationId}/events
   * @response `200` `GetEventsData` Success
   */
  getEvents(examinationId: string): Observable<GetEventsData> {
    return this.http.get<GetEventsData>(this.url + `/Examination/${examinationId}/events`);
  }
  /**
   * No description
   *
   * @tags Examination
   * @name GetHandoverData
   * @request GET:/Examination/{examinationId}/handover
   * @response `200` `GetHandoverDataData` Success
   */
  getHandoverData(examinationId: string): Observable<GetHandoverDataData> {
    return this.http.get<GetHandoverDataData>(this.url + `/Examination/${examinationId}/handover`);
  }
  /**
   * No description
   *
   * @tags Examination
   * @name GetShifts
   * @request GET:/Examination/{examinationId}/shift
   * @response `200` `GetShiftsData` Success
   */
  getShifts(examinationId: string): Observable<GetShiftsData> {
    return this.http.get<GetShiftsData>(this.url + `/Examination/${examinationId}/shift`);
  }
  /**
   * No description
   *
   * @tags Examination
   * @name AssignInvigilatorsToShifts
   * @request PATCH:/Examination/{examinationId}/shift
   * @response `200` `AssignInvigilatorsToShiftsData` Success
   */
  assignInvigilatorsToShifts(
    examinationId: string,
    data: AssignInvigilatorsToShiftsPayload,
  ): Observable<AssignInvigilatorsToShiftsData> {
    return this.http.patch<AssignInvigilatorsToShiftsData>(this.url + `/Examination/${examinationId}/shift`, data);
  }
  /**
   * No description
   *
   * @tags Examination
   * @name UpdateShiftExamination
   * @request PATCH:/Examination/{examinationId}/shift/{shiftId}
   * @deprecated
   * @response `200` `UpdateShiftExaminationData` Success
   */
  updateShiftExamination(
    examinationId: string,
    shiftId: string,
    data: UpdateShiftExaminationPayload,
  ): Observable<UpdateShiftExaminationData> {
    return this.http.patch<UpdateShiftExaminationData>(
      this.url + `/Examination/${examinationId}/shift/${shiftId}`,
      data,
    );
  }
  /**
   * No description
   *
   * @tags Examination
   * @name AutoAssignTeachersToShift
   * @request POST:/Examination/{examinationId}/shift/calculate
   * @response `200` `AutoAssignTeachersToShiftData` Success
   */
  autoAssignTeachersToShift(examinationId: string): Observable<AutoAssignTeachersToShiftData> {
    return this.http.post<AutoAssignTeachersToShiftData>(
      this.url + `/Examination/${examinationId}/shift/calculate`,
      {},
    );
  }
  /**
   * No description
   *
   * @tags Examination
   * @name ChangeStatus
   * @request POST:/Examination/{examinationId}/status
   * @response `200` `ChangeStatusData` Success
   */
  changeStatus(examinationId: string, data: ChangeStatusPayload): Observable<ChangeStatusData> {
    return this.http.post<ChangeStatusData>(this.url + `/Examination/${examinationId}/status`, data);
  }
  /**
   * No description
   *
   * @tags Examination
   * @name UpdateExamsCount
   * @request PATCH:/Examination/{examinationId}/exams-number
   * @response `200` `UpdateExamsCountData` Success
   */
  updateExamsCount(examinationId: string, data: UpdateExamsCountPayload): Observable<UpdateExamsCountData> {
    return this.http.patch<UpdateExamsCountData>(this.url + `/Examination/${examinationId}/exams-number`, data);
  }
  /**
   * No description
   *
   * @tags Examination
   * @name GetGroupsByFacultyId
   * @request GET:/Examination/{examinationId}/faculty/{facultyId}/group
   * @response `200` `GetGroupsByFacultyIdData` Success
   */
  getGroupsByFacultyId(examinationId: string, facultyId: string): Observable<GetGroupsByFacultyIdData> {
    return this.http.get<GetGroupsByFacultyIdData>(
      this.url + `/Examination/${examinationId}/faculty/${facultyId}/group`,
    );
  }
  /**
   * No description
   *
   * @tags Examination
   * @name UpdateTeacherAssignment
   * @request POST:/Examination/{examinationId}/faculty/{facultyId}/group
   * @response `200` `UpdateTeacherAssignmentData` Success
   */
  updateTeacherAssignment(
    examinationId: string,
    facultyId: string,
    data: UpdateTeacherAssignmentPayload,
  ): Observable<UpdateTeacherAssignmentData> {
    return this.http.post<UpdateTeacherAssignmentData>(
      this.url + `/Examination/${examinationId}/faculty/${facultyId}/group`,
      data,
    );
  }
  /**
   * No description
   *
   * @tags Examination
   * @name AutoAssignTeachersToGroups
   * @request POST:/Examination/{examinationId}/faculty/{facultyId}/group/calculate
   * @response `200` `AutoAssignTeachersToGroupsData` Success
   */
  autoAssignTeachersToGroups(examinationId: string, facultyId: string): Observable<AutoAssignTeachersToGroupsData> {
    return this.http.post<AutoAssignTeachersToGroupsData>(
      this.url + `/Examination/${examinationId}/faculty/${facultyId}/group/calculate`,
      {},
    );
  }
  /**
   * No description
   *
   * @tags Examination
   * @name GetAllGroups
   * @request GET:/Examination/{examinationId}/group
   * @response `200` `GetAllGroupsData` Success
   */
  getAllGroups(examinationId: string): Observable<GetAllGroupsData> {
    return this.http.get<GetAllGroupsData>(this.url + `/Examination/${examinationId}/group`);
  }
  /**
   * No description
   *
   * @tags Examination
   * @name CalculateInvigilatorNumerateOfShiftForEachFaculty
   * @request POST:/Examination/{examinationId}/group/calculate
   * @response `200` `CalculateInvigilatorNumerateOfShiftForEachFacultyData` Success
   */
  calculateInvigilatorNumerateOfShiftForEachFaculty(
    examinationId: string,
  ): Observable<CalculateInvigilatorNumerateOfShiftForEachFacultyData> {
    return this.http.post<CalculateInvigilatorNumerateOfShiftForEachFacultyData>(
      this.url + `/Examination/${examinationId}/group/calculate`,
      {},
    );
  }
  /**
   * No description
   *
   * @tags Examination
   * @name UpdateTemporaryTeacherToUserIdInDepartmentShiftGroup
   * @request POST:/Examination/{examinationId}/group/{groupId}/department/{departmentId}
   * @deprecated
   * @response `200` `UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupData` Success
   */
  updateTemporaryTeacherToUserIdInDepartmentShiftGroup(
    examinationId: string,
    groupId: string,
    departmentId: string,
    data: UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupPayload,
  ): Observable<UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupData> {
    return this.http.post<UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupData>(
      this.url + `/Examination/${examinationId}/group/${groupId}/department/${departmentId}`,
      data,
    );
  }
  /**
   * No description
   *
   * @tags Examination
   * @name AssignInvigilatorNumerateOfShiftToFaculty
   * @request POST:/Examination/{examinationId}/group/{groupId}/{facultyId}
   * @deprecated
   * @response `200` `AssignInvigilatorNumerateOfShiftToFacultyData` Success
   */
  assignInvigilatorNumerateOfShiftToFaculty(
    examinationId: string,
    groupId: string,
    facultyId: string,
    data: AssignInvigilatorNumerateOfShiftToFacultyPayload,
  ): Observable<AssignInvigilatorNumerateOfShiftToFacultyData> {
    return this.http.post<AssignInvigilatorNumerateOfShiftToFacultyData>(
      this.url + `/Examination/${examinationId}/group/${groupId}/${facultyId}`,
      data,
    );
  }
  /**
   * No description
   *
   * @tags Examination
   * @name GetAvailableInvigilatorsInShiftGroup
   * @request GET:/Examination/{examinationId}/invigilator
   * @response `200` `GetAvailableInvigilatorsInShiftGroupData` Success
   */
  getAvailableInvigilatorsInShiftGroup(examinationId: string): Observable<GetAvailableInvigilatorsInShiftGroupData> {
    return this.http.get<GetAvailableInvigilatorsInShiftGroupData>(
      this.url + `/Examination/${examinationId}/invigilator`,
    );
  }
  /**
   * No description
   *
   * @tags Examination
   * @name GetSummary
   * @request GET:/Examination/{examinationId}/summary
   * @response `200` `GetSummaryData` Success
   */
  getSummary(examinationId: string): Observable<GetSummaryData> {
    return this.http.get<GetSummaryData>(this.url + `/Examination/${examinationId}/summary`);
  }
  /**
   * No description
   *
   * @tags Examination
   * @name GetTemporaryData
   * @request GET:/Examination/{examinationId}/temporary
   * @response `200` `GetTemporaryDataData` Success
   */
  getTemporaryData(examinationId: string): Observable<GetTemporaryDataData> {
    return this.http.get<GetTemporaryDataData>(this.url + `/Examination/${examinationId}/temporary`);
  }
}
