import { Inject, Injectable } from '@angular/core';
import { ESM_LOGGER_OPTIONS, LoggerOptions } from '@esm/core';
import { ErrorLogger } from 'src/cdk/loggers';

export type NotNullErrorParams<T> = {
  value: T | null | undefined;
  valueType: string;
};

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(
    @Inject(ESM_LOGGER_OPTIONS) private readonly options: LoggerOptions,
  ) {}

  public errorNotNullOrEmpty<T>(params: NotNullErrorParams<T>): T;
  public errorNotNullOrEmpty<T>(params: NotNullErrorParams<T>[]): T[];

  public errorNotNullOrEmpty<T>(
    params: NotNullErrorParams<T> | NotNullErrorParams<T>[],
  ): T | T[] {
    if ('value' in params) {
      return ErrorLogger.notNullOrEmpty(
        params.value,
        this.options.tag,
        params.valueType,
      );
    }

    return params.map((p) =>
      ErrorLogger.notNullOrEmpty(p.value, this.options.tag, p.valueType),
    );
  }
}
