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
  CreateModuleData,
  CreateModulePayload,
  ImportExaminationModuleData,
  ImportExaminationModulePayload,
} from "./data-contracts";

@Injectable({
  providedIn: "root",
})
export class ModuleService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Module
   * @name CreateModule
   * @request POST:/Module
   * @response `200` `CreateModuleData` Success
   */
  createModule(data: CreateModulePayload): Observable<CreateModuleData> {
    return this.http.post<CreateModuleData>(this.url + `/Module`, data);
  }
  /**
   * No description
   *
   * @tags Module
   * @name ImportExaminationModule
   * @request POST:/Module/import
   * @response `200` `ImportExaminationModuleData` Success
   */
  importExaminationModule(data: ImportExaminationModulePayload): Observable<ImportExaminationModuleData> {
    return this.http.post<ImportExaminationModuleData>(this.url + `/Module/import`, data);
  }
}
