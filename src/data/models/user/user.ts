import { SimpleDepartment } from '../department';
import { Role } from './role';

export type UserSummary = {
  id: string;
  displayId: string | null;
  fullName: string;
  email: string;
  createdAt: Date;
  department: SimpleDepartment;
  roles: Role[];
  isMale: boolean;
};
