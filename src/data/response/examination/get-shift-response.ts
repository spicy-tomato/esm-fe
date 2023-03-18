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
};
