import { ExamMethod } from './examination-method';

export type TemporaryExamination = {
  id: string;
  moduleId?: string;
  moduleName?: string;
  moduleClass?: string;
  credit?: number;
  method?: ExamMethod;
  date?: Date;
  startAt?: Date;
  endAt?: Date;
  shift?: number;
  candidateCount?: number;
  roomsCount?: number;
  rooms?: string;
  faculty?: string;
  department?: string;
  departmentAssign?: boolean;
  errors: Record<number, Record<string, string>>;
};
