import { SimpleSchool } from '../school';

export type SimpleFaculty = {
  id: string;
  displayId: string | null;
  name: string;
  school: SimpleSchool;
};
