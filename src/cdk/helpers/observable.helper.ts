import {
  filter,
  Observable,
  OperatorFunction,
  pipe,
  UnaryFunction,
} from 'rxjs';
import { ObjectHelper } from './object.helper';

export class ObservableHelper {
  static filterNullish<T>(): UnaryFunction<
    Observable<T | null | undefined>,
    Observable<T>
  > {
    return pipe(
      filter((x) => !ObjectHelper.isNullOrUndefined(x)) as OperatorFunction<
        T | null | undefined,
        T
      >
    );
  }
}
