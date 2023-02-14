import { SimpleFaculty } from '../faculty';
import { SimpleSchool } from '../school';

export type SimpleDepartment = {
  id: string;
  displayId: string | null;
  name: string;
  school: SimpleSchool;
  faculty: SimpleFaculty | null;
};
