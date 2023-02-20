import { DepartmentSimple } from '../department';

export type FacultyWithDepartments = {
  id: string;
  displayId: string | null;
  name: string;
  departments: DepartmentSimple[];
};
