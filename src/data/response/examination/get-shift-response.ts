import { ExamMethod, ModuleSimple, RoomSummary } from '../../models';

export type ExaminationGetShiftResponseItem = {
  invigilatorShift: {
    id: string;
    orderIndex: number;
    invigilator: null | {
      fullName: string;
      id: string;
      invigilatorId: string;
      department: null | {
        displayId: string | null;
        name: string;
        faculty: null | {
          displayId: string | null;
          name: string;
        };
      };
    };
  }[];
  isDuplicated: boolean;
  room: RoomSummary;
  shiftGroup: {
    id: string;
    method: ExamMethod;
    startAt: Date;
    shift: number | null;
    departmentAssign: boolean;
    module: ModuleSimple;
  };
  startAt: Date;
};
