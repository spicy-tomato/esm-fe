import { ExamMethod } from '../../models';

export type AssignInvigilatorNumerateOfShiftToFacultyResponse = {
  id: string;
  method: ExamMethod;
  invigilatorsCount: number;
  roomsCount: number;
  startAt: string;
  shift: number | null;
  departmentAssign: boolean;
  module: {
    displayId: string;
    name: string;
    faculty: {
      name: string;
    };
  };
  assignNumerate: Record<
    string,
    {
      actual: number;
      calculated: number;
      maximum: number;
    }
  >;
};
