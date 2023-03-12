import { ModuleSimple } from '../module/module-simple';
import { ExamMethod } from './exam-method';
import { ExaminationSummary } from './examination-summary';

export type ShiftGroupSimple = {
  id: string;
  method: ExamMethod;
  invigilatorsCount: number;
  roomsCount: number;
  startAt: Date;
  shift?: number;
  departmentAssign: boolean;
  examination: ExaminationSummary;
  module: ModuleSimple;
  assignNumerate: Record<
    string,
    {
      actual: number;
      calculated: number;
      maximum: number;
    }
  >;
};
