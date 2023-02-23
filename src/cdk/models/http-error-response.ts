import { HttpErrorResponse } from '@angular/common/http';
import { Result } from './result';

export interface EsmHttpErrorResponse<T = any> extends HttpErrorResponse {
  readonly error: Result<T>;
}
