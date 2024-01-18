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
import { APP_ENV } from "@esm/core";
import { Observable } from "rxjs";
import {
  AssignInvigilatorsNumberToFacultyData,
  AssignInvigilatorsNumberToFacultyPayload,
  UpdateTemporaryNameToTeacherData,
  UpdateTemporaryNameToTeacherPayload,
} from "./data-contracts";

@Injectable({
  providedIn: "root",
})
export class GroupService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Group
   * @name UpdateTemporaryNameToTeacher
   * @request PATCH:/Group/{groupId}
   * @response `200` `UpdateTemporaryNameToTeacherData` Success
   */
  updateTemporaryNameToTeacher(
    groupId: string,
    data: UpdateTemporaryNameToTeacherPayload,
  ): Observable<UpdateTemporaryNameToTeacherData> {
    return this.http.patch<UpdateTemporaryNameToTeacherData>(this.url + `/Group/${groupId}`, data);
  }
  /**
   * No description
   *
   * @tags Group
   * @name AssignInvigilatorsNumberToFaculty
   * @request PATCH:/Group/{groupId}/{facultyId}
   * @response `200` `AssignInvigilatorsNumberToFacultyData` Success
   */
  assignInvigilatorsNumberToFaculty(
    groupId: string,
    facultyId: string,
    data: AssignInvigilatorsNumberToFacultyPayload,
  ): Observable<AssignInvigilatorsNumberToFacultyData> {
    return this.http.patch<AssignInvigilatorsNumberToFacultyData>(this.url + `/Group/${groupId}/${facultyId}`, data);
  }
}
