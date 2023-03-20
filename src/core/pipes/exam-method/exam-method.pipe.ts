import { Pipe, PipeTransform } from '@angular/core';
import { StringHelper } from '@esm/cdk';
import { ExamMethod } from '@esm/data';

@Pipe({
  name: 'examMethod',
  standalone: true,
})
export class ExamMethodPipe implements PipeTransform {
  transform(method: ExamMethod): string {
    return StringHelper.getExamMethod(method);
  }
}
