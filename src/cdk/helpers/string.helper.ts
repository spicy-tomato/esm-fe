import { ExamMethod } from '@esm/data';
import { Md5 } from 'ts-md5';
import { ArrayHelper } from './array.helper';

export class StringHelper {
  static EXAM_METHOD_MAPPING = {
    0: 'Trắc nghiệm',
    1: 'Tự luận',
    2: 'Thực hành',
    3: 'Vấn đáp',
    4: 'Báo cáo 1',
    5: 'Báo cáo 2',
  };

  static md5(text: string): string {
    return new Md5().appendStr(text).end() as string;
  }

  static getFirstName(name: string): string {
    return ArrayHelper.last(name.split(' '));
  }

  static getExamMethod(method: ExamMethod): string {
    return this.EXAM_METHOD_MAPPING[method];
  }
}
