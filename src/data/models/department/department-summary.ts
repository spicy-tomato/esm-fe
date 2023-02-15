import { FacultySummary } from '../faculty';
import { SchoolSummary } from '../school';

export type DepartmentSummary = {
  id: string;
  displayId: string | null;
  name: string;
  school: SchoolSummary;
  faculty: FacultySummary | null;
};
