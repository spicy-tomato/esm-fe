import { Result } from '@esm/cdk';

export class ResultBuilder {
  static success<T>(data: T): Result<T> {
    return {
      data,
      success: true,
      errors: null,
    };
  }

  static error(): Result<any> {
    return {
      data: false,
      success: false,
      errors: [],
    };
  }
}
