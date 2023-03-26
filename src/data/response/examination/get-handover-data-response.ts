import { ExamMethod } from '../../models';

export type GetHandoverDataResponseItem = {
  handedOverUserId: string | null;
  id: string;
  invigilatorShift: {
    id: string;
    orderIndex: number;
    invigilator: null | {
      id: string;
      fullName: string;
      invigilatorId: string | null;
      department: {
        displayId: string | null;
        name: string;
        faculty: null | {
          displayId: string | null;
          name: string;
        };
      };
    };
  }[];
  report: string | null;
  room: {
    displayId: string;
  };
  shiftGroup: {
    id: string;
    method: ExamMethod;
    startAt: Date;
    shift: number | null;
    departmentAssign: boolean;
    module: {
      displayId: string;
      name: string;
      faculty: {
        displayId: string | null;
        name: string;
      };
    };
  };
};
