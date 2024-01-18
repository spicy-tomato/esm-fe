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
  CreateFacultyData,
  CreateFacultyPayload,
  CreateModuleFacultyData,
  CreateModuleFacultyPayload,
  GetAllFacultyData,
  GetUserData,
  UpdateFacultyData,
  UpdateFacultyPayload,
} from "./data-contracts";

@Injectable({
  providedIn: "root",
})
export class FacultyService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Faculty
   * @name GetAllFaculty
   * @request GET:/Faculty
   * @response `200` `GetAllFacultyData` Success
   */
  getAllFaculty(): Observable<GetAllFacultyData> {
    return this.http.get<GetAllFacultyData>(this.url + `/Faculty`);
  }
  /**
   * No description
   *
   * @tags Faculty
   * @name CreateFaculty
   * @request POST:/Faculty
   * @response `200` `CreateFacultyData` Success
   */
  createFaculty(data: CreateFacultyPayload): Observable<CreateFacultyData> {
    return this.http.post<CreateFacultyData>(this.url + `/Faculty`, data);
  }
  /**
   * No description
   *
   * @tags Faculty
   * @name UpdateFaculty
   * @request PUT:/Faculty/{facultyId}
   * @response `200` `UpdateFacultyData` Success
   */
  updateFaculty(facultyId: string, data: UpdateFacultyPayload): Observable<UpdateFacultyData> {
    return this.http.put<UpdateFacultyData>(this.url + `/Faculty/${facultyId}`, data);
  }
  /**
   * No description
   *
   * @tags Faculty
   * @name GetUser
   * @request GET:/Faculty/{facultyId}/users
   * @response `200` `GetUserData` Success
   */
  getUser(facultyId: string): Observable<GetUserData> {
    return this.http.get<GetUserData>(this.url + `/Faculty/${facultyId}/users`);
  }
  /**
   * No description
   *
   * @tags Faculty
   * @name CreateModuleFaculty
   * @request POST:/Faculty/{facultyId}/module
   * @deprecated
   * @response `200` `CreateModuleFacultyData` Success
   */
  createModuleFaculty(facultyId: string, data: CreateModuleFacultyPayload): Observable<CreateModuleFacultyData> {
    return this.http.post<CreateModuleFacultyData>(this.url + `/Faculty/${facultyId}/module`, data);
  }
}
