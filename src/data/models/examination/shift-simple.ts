import { RoomSummary } from '../room/room-summary';
import { ShiftGroupSimple } from './shift-group';

export type ShiftSimple = {
  id: string;
  examsCount: number;
  candidatesCount: number;
  invigilatorsCount: number;
  startAt: Date;
  room: RoomSummary;
  shiftGroup: ShiftGroupSimple;
};
