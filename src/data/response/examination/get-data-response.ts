import { ExamMethod } from '../../models';

export type ExaminationGetDataResponseItem = {
  id: string;
  examsCount: number;
  candidatesCount: number;
  invigilatorsCount: number;
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
      credits: number;
    };
  };
};
