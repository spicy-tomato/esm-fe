import { UserSimple } from '../../models';

export type GetGroupByFacultyIdResponseItem = {
  id: string;
  departmentId: string | null;
  user: UserSimple | null;
  temporaryInvigilatorName: string | null;
  facultyShiftGroup: {
    id: string;
    shiftGroup: {
      startAt: string;
      shift: number | null;
      module: {
        displayId: string;
        name: string;
      };
    };
  };
};
