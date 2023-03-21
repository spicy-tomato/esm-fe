import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_ENV } from '@esm/core';
import { Observable } from 'rxjs';
import { GetNotificationParams } from '../../shared/components/notification-list/data-access/models';
import { NotificationPage } from '../../shared/components/notification-list/data-access/models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl + 'notifications/';

  getAll(
    idAccount: string,
    params: GetNotificationParams
  ): Observable<NotificationPage> {
    return this.http.get<NotificationPage>(
      this.url + `v1/accounts/${idAccount}/notifications`,
      { params }
    );
  }

  getUnread(
    idAccount: string,
    params: GetNotificationParams
  ): Observable<NotificationPage> {
    return this.http.get<NotificationPage>(
      this.url + `v1/accounts/${idAccount}/notifications/unread`,
      { params }
    );
  }

  markAllAsRead(idAccount: string): Observable<void> {
    return this.http.put<void>(
      this.url + `v1/accounts/${idAccount}/notifications/mark-as-read`,
      {}
    );
  }

  markAsRead(idAccount: string, idNotification: number): Observable<void> {
    return this.http.patch<void>(
      this.url +
        `v1/accounts/${idAccount}/notifications/${idNotification}/mark-as-read`,
      {}
    );
  }
}
