import { SchoolSummary } from '../school';

export type FacultySummary = {
  id: string;
  displayId: string | null;
  name: string;
  school: SchoolSummary;
};
