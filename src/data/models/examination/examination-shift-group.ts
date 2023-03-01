import { ModuleSimple } from '../module/module-simple';
import { ExamMethod } from './exam-method';
import { ExaminationSummary } from './examination-summary';

export type ExaminationShiftGroupSimple = {
  id: string;
  method: ExamMethod;
  invigilatorsCount: number;
  roomsCount: number;
  startAt: Date;
  shift?: number;
  departmentAssign: boolean;
  examination: ExaminationSummary;
  moduleId?: string;
  module: ModuleSimple;
};
