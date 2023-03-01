import { RoomSummary } from '../room/room-summary';
import { ExaminationShiftGroupSimple } from './examination-shift-group';

export type ExaminationShiftSimple = {
  id: string;
  examsCount: number;
  candidatesCount: number;
  invigilatorsCount: number;
  startAt: Date;
  room: RoomSummary;
  examinationShiftGroup: ExaminationShiftGroupSimple;
};
