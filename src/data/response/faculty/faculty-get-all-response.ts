import { DepartmentSimple } from '../../models';

export type FacultyGetAllResponseItem = {
  id: string;
  displayId: string | null;
  name: string;
  departments: DepartmentSimple[];
};
