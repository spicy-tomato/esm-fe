export type UpdateExaminationRequest = {
  name: string | null;
  displayId: string | null;
  description: string | null;
  expectStartAt: Date | null;
  expectEndAt: Date | null;
  updatedAt: Date;
};
