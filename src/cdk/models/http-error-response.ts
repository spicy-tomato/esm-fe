import { HttpErrorResponse } from '@angular/common/http';
import { Result } from './result';

export interface EsmHttpErrorResponse<T = unknown> extends HttpErrorResponse {
  readonly error: Result<T>;
}
