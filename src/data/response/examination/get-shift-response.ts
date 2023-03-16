import { ExamMethod, ModuleSimple, RoomSummary } from '../../models';

export type ExaminationGetShiftResponseItem = {
  startAt: Date;
  shiftGroup: {
    method: ExamMethod;
    startAt: Date;
    shift: number | null;
    departmentAssign: boolean;
    module: ModuleSimple;
  };
  room: RoomSummary;
  invigilatorShift: {
    id: string;
    invigilatorId: string | null;
  }[];
};
