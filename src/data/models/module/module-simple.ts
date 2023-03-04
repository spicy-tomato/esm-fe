import { FacultySummary } from '../faculty/faculty-summary';

export type ModuleSimple = {
  id: string;
  displayId: string;
  name: string;
  credits: number;
  faculty: FacultySummary;
};
