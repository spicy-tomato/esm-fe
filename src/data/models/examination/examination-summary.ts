import { UserSummary } from "../user";

export type ExaminationSummary = {
  id: string;
  displayId: string;
  name: string;
  description: string | null;
  expectStartAt: Date | null;
  expectEndAt: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  createdBy: UserSummary;
};
