import { FacultySummary } from '../faculty';

export type DepartmentSummary = {
  id: string;
  displayId: string | null;
  name: string;
  faculty: FacultySummary | null;
};
