import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { AppEnv, APP_ENV } from '@esm/core';
import { CreateModuleRequest, ModuleSimple } from '@esm/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  // PRIVATE PROPERTIES
  private readonly url: string;

  // CONSTRUCTOR
  constructor(private readonly http: HttpClient, @Inject(APP_ENV) env: AppEnv) {
    this.url = env.baseUrl + 'faculty/';
  }

  // PUBLIC METHODS
  createModule(
    facultyId: string,
    request: CreateModuleRequest
  ): Observable<Result<ModuleSimple>> {
    return this.http.post<Result<ModuleSimple>>(
      this.url + facultyId + '/modules',
      request
    );
  }
}
