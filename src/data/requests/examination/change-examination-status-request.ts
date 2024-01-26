import { ExaminationStatus } from 'src/data/models';

export type ChangeExaminationStatusRequest = {
  status: ExaminationStatus;
  createdAt: Date;
};
