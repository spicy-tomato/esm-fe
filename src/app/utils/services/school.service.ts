import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Result } from '@esm/cdk';
import { AppEnv, APP_ENV } from '@esm/core';
import { FacultyWithDepartments } from '@esm/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  // PRIVATE PROPERTIES
  private readonly url: string;

  // CONSTRUCTOR
  constructor(private readonly http: HttpClient, @Inject(APP_ENV) env: AppEnv) {
    this.url = env.baseUrl + 'school/';
  }

  // PUBLIC METHODS
  getDepartments(schoolId: string): Observable<Result<FacultyWithDepartments[]>> {
    return this.http.get<Result<FacultyWithDepartments[]>>(
      this.url + schoolId + '/departments'
    );
  }
}
