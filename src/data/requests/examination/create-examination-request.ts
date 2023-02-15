export type CreateExaminationRequest = {
  name: string;
  displayId: string | null;
  description: string | null;
  expectStartAt: Date | null;
  expectEndAt: Date | null;
};
