import { ExaminationStatus } from './examination-status';

export type ExaminationEvent = {
  id: string;
  events: {
    status: ExaminationStatus;
    dateTime: Date;
  }[];
};
