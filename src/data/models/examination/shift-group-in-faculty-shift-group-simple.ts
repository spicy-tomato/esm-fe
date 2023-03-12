import { ModuleSimple } from '../module/module-simple';
import { ExamMethod } from './exam-method';

export type ShiftGroupInDepartmentShiftGroupSimple = {
  id: string;
  method: ExamMethod;
  startAt: Date;
  shift?: number;
  module: ModuleSimple;
};
