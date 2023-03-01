import { ModuleSimple } from '../module/module-simple';
import { RoomSummary } from '../room/room-summary';
import { ExamMethod } from './exam-method';

export type ExaminationShiftSimple = {
  id: string;
  method: ExamMethod;
  examsCount: number;
  candidatesCount: number;
  invigilatorsCount: number;
  startAt: Date;
  shift?: number;
  module: ModuleSimple;
  room: RoomSummary;
  departmentAssign: boolean;
};
