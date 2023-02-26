import { DepartmentSummary } from '../department';
import { Role } from './role';

export type UserSummary = {
  id: string;
  invigilatorId: string;
  fullName: string;
  email: string;
  createdAt: Date;
  department: DepartmentSummary | null;
  roles: Role[];
  isMale: boolean;
};
