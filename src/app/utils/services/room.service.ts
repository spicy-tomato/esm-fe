import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { AppEnv, APP_ENV } from '@esm/core';
import { CreateRoomRequest, RoomSummary } from '@esm/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  // PRIVATE PROPERTIES
  private readonly url: string;

  // CONSTRUCTOR
  constructor(private readonly http: HttpClient, @Inject(APP_ENV) env: AppEnv) {
    this.url = env.baseUrl + 'room/';
  }

  // PUBLIC METHODS
  create(request: CreateRoomRequest): Observable<Result<RoomSummary>> {
    return this.http.post<Result<RoomSummary>>(this.url, request);
  }
}
