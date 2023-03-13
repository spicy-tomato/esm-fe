import { UserSimple } from '../user';
import { ShiftGroupInDepartmentShiftGroupSimple } from './shift-group-in-faculty-shift-group-simple';

export type DepartmentShiftGroupSimple = {
  id: string;
  departmentId: string | null;
  user: UserSimple | null;
  temporaryInvigilatorName: string | null;
  facultyShiftGroup: {
    id: string;
    shiftGroup: ShiftGroupInDepartmentShiftGroupSimple;
  };
};
