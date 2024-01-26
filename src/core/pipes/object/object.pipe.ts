import { Pipe, PipeTransform } from '@angular/core';

type Operator = 'in';
type OperatorParam = {
  in: string;
};
type OperatorResult = {
  in: boolean;
};

@Pipe({
  name: 'object',
  standalone: true,
})
export class ObjectPipe implements PipeTransform {
  transform<T, V extends T>(
    value: T,
    operator: 'in',
    param: string,
    _: V,
  ): value is V;

  transform<T extends Record<string, unknown>, O extends Operator>(
    value: T,
    operator: O,
    param: OperatorParam[O],
  ): OperatorResult[O] {
    if (operator === 'in') {
      return (param as OperatorParam['in']) in value;
    }

    throw Error('Invalid operator');
  }
}
