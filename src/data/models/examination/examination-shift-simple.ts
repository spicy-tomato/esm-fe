import { ModuleSimple } from '../module/module-simple';
import { RoomSummary } from '../room/room-summary';
import { ExamMethod } from './exam-method';

export type ExaminationShiftSimple = {
  id: number;
  method: ExamMethod;
  examsCount: number;
  startAt: Date;
  module: ModuleSimple;
  room: RoomSummary;
};
