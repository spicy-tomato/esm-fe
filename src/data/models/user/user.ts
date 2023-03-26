import { DepartmentSummary } from '../department';
import { Role } from './role';

export class UserSummary {
  id!: string;
  invigilatorId!: string;
  fullName!: string;
  email!: string;
  createdAt!: Date;
  department!: DepartmentSummary | null;
  role!: typeof Role[keyof typeof Role];
  isMale!: boolean;
  phoneNumber!: string | null;

  toString(): string {
    return this.fullName;
  }
}
