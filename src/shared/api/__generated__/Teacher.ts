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
  GetAllTeacherData,
  GetAllTeacherParams,
  SearchData,
  SearchParams,
  UpdateInfoData,
  UpdateInfoPayload,
} from "./data-contracts";

@Injectable({
  providedIn: "root",
})
export class TeacherService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Teacher
   * @name GetAllTeacher
   * @request GET:/Teacher
   * @response `200` `GetAllTeacherData` Success
   */
  getAllTeacher(query: GetAllTeacherParams): Observable<GetAllTeacherData> {
    return this.http.get<GetAllTeacherData>(this.url + `/Teacher`, {
      params: ObjectHelper.removeUndefinedField(query),
    });
  }
  /**
   * No description
   *
   * @tags Teacher
   * @name Search
   * @request GET:/Teacher/search
   * @response `200` `SearchData` Success
   */
  search(query: SearchParams): Observable<SearchData> {
    return this.http.get<SearchData>(this.url + `/Teacher/search`, {
      params: ObjectHelper.removeUndefinedField(query),
    });
  }
  /**
   * No description
   *
   * @tags Teacher
   * @name UpdateInfo
   * @request PUT:/Teacher/{teacherId}
   * @response `200` `UpdateInfoData` Success
   */
  updateInfo(teacherId: string, data: UpdateInfoPayload): Observable<UpdateInfoData> {
    return this.http.put<UpdateInfoData>(this.url + `/Teacher/${teacherId}`, data);
  }
}
