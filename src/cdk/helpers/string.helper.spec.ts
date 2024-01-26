import { ExamMethod } from '@esm/data';
import { StringHelper } from './string.helper';

describe('StringHelper', () => {
  describe('md5', () => {
    it('should encode', () => {
      expect(StringHelper.md5('test')).toEqual(
        '098f6bcd4621d373cade4e832627b4f6',
      );
      expect(StringHelper.md5('random string')).toEqual(
        '706b16b2fb732ab6079a10fea61d078b',
      );
    });
  });

  describe('getFirstName', () => {
    it('should get first name', () => {
      expect(StringHelper.getFirstName('Nguyễn Văn A')).toEqual('A');
      expect(StringHelper.getFirstName('Harry Kane')).toEqual('Kane');
    });
  });

  describe('getFirstName', () => {
    it('should return exam method in string', () => {
      expect(StringHelper.getExamMethod(ExamMethod.Select)).toEqual(
        'Trắc nghiệm',
      );
      expect(StringHelper.getExamMethod(ExamMethod.Write)).toEqual('Tự luận');
      expect(StringHelper.getExamMethod(ExamMethod.Practice)).toEqual(
        'Thực hành',
      );
      expect(StringHelper.getExamMethod(ExamMethod.Oral)).toEqual('Vấn đáp');
      expect(StringHelper.getExamMethod(ExamMethod.Report1)).toEqual(
        'Báo cáo 1',
      );
      expect(StringHelper.getExamMethod(ExamMethod.Report2)).toEqual(
        'Báo cáo 2',
      );
    });
  });
});
