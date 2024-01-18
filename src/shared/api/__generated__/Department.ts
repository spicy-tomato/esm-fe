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
  CreateDepartmentData,
  CreateDepartmentPayload,
  CreateUserData,
  CreateUserPayload,
  ImportDepartmentData,
  ImportDepartmentPayload,
  UpdateDepartmentData,
  UpdateDepartmentPayload,
} from "./data-contracts";

@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Department
   * @name CreateDepartment
   * @request POST:/Department
   * @response `200` `CreateDepartmentData` Success
   */
  createDepartment(data: CreateDepartmentPayload): Observable<CreateDepartmentData> {
    return this.http.post<CreateDepartmentData>(this.url + `/Department`, data);
  }
  /**
   * No description
   *
   * @tags Department
   * @name ImportDepartment
   * @request POST:/Department/import
   * @response `200` `ImportDepartmentData` Success
   */
  importDepartment(data: ImportDepartmentPayload): Observable<ImportDepartmentData> {
    return this.http.post<ImportDepartmentData>(this.url + `/Department/import`, data);
  }
  /**
   * No description
   *
   * @tags Department
   * @name UpdateDepartment
   * @request PUT:/Department/{departmentId}
   * @response `200` `UpdateDepartmentData` Success
   */
  updateDepartment(departmentId: string, data: UpdateDepartmentPayload): Observable<UpdateDepartmentData> {
    return this.http.put<UpdateDepartmentData>(this.url + `/Department/${departmentId}`, data);
  }
  /**
   * No description
   *
   * @tags Department
   * @name CreateUser
   * @request POST:/Department/{departmentId}/user
   * @response `200` `CreateUserData` Success
   */
  createUser(departmentId: string, data: CreateUserPayload): Observable<CreateUserData> {
    return this.http.post<CreateUserData>(this.url + `/Department/${departmentId}/user`, data);
  }
}
