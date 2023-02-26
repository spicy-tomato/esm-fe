import { DepartmentSummary } from '../department';
import { InvigilatorSimple } from './invigilator-simple';
import { Role } from './role';

export type UserSummary = {
  id: string;
  invigilator: InvigilatorSimple;
  fullName: string;
  email: string;
  createdAt: Date;
  department: DepartmentSummary | null;
  roles: Role[];
  isMale: boolean;
};
