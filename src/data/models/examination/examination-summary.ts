import { UserSummary } from '../user';
import { ExaminationStatus } from './examination-status';

export type ExaminationSummary = {
  id: string;
  displayId: string;
  name: string;
  description: string | null;
  expectStartAt: string | null;
  expectEndAt: string | null;
  status: ExaminationStatus;
  createdAt: Date;
  updatedAt: Date | null;
  createdBy: UserSummary;
};
