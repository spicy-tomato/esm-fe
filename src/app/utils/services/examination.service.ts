import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { AppEnv, APP_ENV } from '@esm/core';
import { ExaminationSummary } from '@esm/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExaminationService {
  // PRIVATE PROPERTIES
  private readonly url: string;

  // CONSTRUCTOR
  constructor(private readonly http: HttpClient, @Inject(APP_ENV) env: AppEnv) {
    this.url = env.baseUrl + 'examination/';
  }

  getRelated(
    isActive?: boolean
  ): Observable<Result<ExaminationSummary[]>> {
    return this.http.get<Result<ExaminationSummary[]>>(this.url + 'related', {
      params: isActive !== undefined ? { isActive } : {},
    });
  }

  getSummary(id: string): Observable<Result<ExaminationSummary>> {
    return this.http.get<Result<ExaminationSummary>>(this.url + `${id}/summary`,);
  }
}
