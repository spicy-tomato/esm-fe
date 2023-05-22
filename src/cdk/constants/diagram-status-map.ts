import { ExaminationStatus } from '@esm/data';

export const DIAGRAM_STATUS_MAP: Record<ExaminationStatus, string> = {
  '0': '0-idle',
  '1': '1-setup',
  '2': '2-assign-faculty',
  '4': '3-assign-department',
  '8': '4-assign-teacher',
  '16': '5-closed',
};
