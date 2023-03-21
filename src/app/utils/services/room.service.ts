import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import { CreateRoomRequest, RoomSummary } from '@esm/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl + 'room/';

  // [POST] /room
  create(request: CreateRoomRequest): Observable<Result<RoomSummary>> {
    return this.http.post<Result<RoomSummary>>(this.url, request);
  }
}
