import { ExamMethod, ModuleSimple, RoomSummary } from '../../models';

export type ExaminationGetShiftResponseItem = {
  startAt: Date;
  shiftGroup: {
    id: string;
    method: ExamMethod;
    startAt: Date;
    shift: number | null;
    departmentAssign: boolean;
    module: ModuleSimple;
  };
  room: RoomSummary;
  invigilatorShift: {
    id: string;
    orderIndex: number;
    invigilatorId: string | null;
  }[];
};
