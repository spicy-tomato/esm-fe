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
  CreateRoomData,
  ESMApplicationRoomsCommandsCreateCreateCommand,
  ImportRoomData,
  ImportRoomPayload,
} from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  /**
   * No description
   *
   * @tags Room
   * @name CreateRoom
   * @request POST:/Room
   * @response `200` `CreateRoomData` Success
   */
  createRoom(
    data: ESMApplicationRoomsCommandsCreateCreateCommand,
  ): Observable<CreateRoomData> {
    return this.http.post<CreateRoomData>(this.url + `/Room`, data);
  }

  /**
   * No description
   *
   * @tags Room
   * @name ImportRoom
   * @request POST:/Room/import
   * @response `200` `ImportRoomData` Success
   */
  importRoom(data: ImportRoomPayload): Observable<ImportRoomData> {
    const formData = new FormData();
    // const fromBody = data as any;
    for (const property in data) {
      formData.append(property, data[property as keyof ImportRoomPayload]);
    }

    return this.http.post<ImportRoomData>(this.url + `/Room/import`, formData);
  }
}

export class RoomApiAction {
  createRoomSuccessful = createAction(
    '[Room/API] createRoom Successful',
    props<{ data: CreateRoomData['data'] }>(),
  );

  createRoomFailed = createAction('[Room/API] createRoom Failed');

  importRoomSuccessful = createAction(
    '[Room/API] importRoom Successful',
    props<{ data: ImportRoomData['data'] }>(),
  );

  importRoomFailed = createAction('[Room/API] importRoom Failed');
}