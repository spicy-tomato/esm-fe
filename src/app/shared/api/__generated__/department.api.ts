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

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APP_ENV } from '@esm/core';
import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CreateDepartmentData,
  CreateUserData,
  ESMApplicationDepartmentsCommandsCreateDepartmentCreateDepartmentCommand,
  ESMApplicationDepartmentsCommandsCreateUserInDepartmentCreateUserInDepartmentParams,
  ESMApplicationDepartmentsCommandsImportDepartmentImportDepartmentCommand,
  ESMApplicationDepartmentsCommandsUpdateDepartmentUpdateDepartmentParams,
  ImportDepartmentData,
  UpdateDepartmentData,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
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
  createDepartment(
    data: ESMApplicationDepartmentsCommandsCreateDepartmentCreateDepartmentCommand,
  ): Observable<CreateDepartmentData> {
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
  importDepartment(
    data: ESMApplicationDepartmentsCommandsImportDepartmentImportDepartmentCommand,
  ): Observable<ImportDepartmentData> {
    return this.http.post<ImportDepartmentData>(
      this.url + `/Department/import`,
      data,
    );
  }

  /**
   * No description
   *
   * @tags Department
   * @name UpdateDepartment
   * @request PUT:/Department/{departmentId}
   * @response `200` `UpdateDepartmentData` Success
   */
  updateDepartment(
    departmentId: string,
    data: ESMApplicationDepartmentsCommandsUpdateDepartmentUpdateDepartmentParams,
  ): Observable<UpdateDepartmentData> {
    return this.http.put<UpdateDepartmentData>(
      this.url + `/Department/${departmentId}`,
      data,
    );
  }

  /**
   * No description
   *
   * @tags Department
   * @name CreateUser
   * @request POST:/Department/{departmentId}/user
   * @response `200` `CreateUserData` Success
   */
  createUser(
    departmentId: string,
    data: ESMApplicationDepartmentsCommandsCreateUserInDepartmentCreateUserInDepartmentParams,
  ): Observable<CreateUserData> {
    return this.http.post<CreateUserData>(
      this.url + `/Department/${departmentId}/user`,
      data,
    );
  }
}

export class DepartmentApiAction {
  createDepartmentSuccessful = createAction(
    '[Department/API] createDepartment Successful',
    props<{ data: CreateDepartmentData['data'] }>(),
  );

  createDepartmentFailed = createAction(
    '[Department/API] createDepartment Failed',
  );

  importDepartmentSuccessful = createAction(
    '[Department/API] importDepartment Successful',
    props<{ data: ImportDepartmentData['data'] }>(),
  );

  importDepartmentFailed = createAction(
    '[Department/API] importDepartment Failed',
  );

  updateDepartmentSuccessful = createAction(
    '[Department/API] updateDepartment Successful',
    props<{ data: UpdateDepartmentData['data'] }>(),
  );

  updateDepartmentFailed = createAction(
    '[Department/API] updateDepartment Failed',
  );

  createUserSuccessful = createAction(
    '[Department/API] createUser Successful',
    props<{ data: CreateUserData['data'] }>(),
  );

  createUserFailed = createAction('[Department/API] createUser Failed');
}
