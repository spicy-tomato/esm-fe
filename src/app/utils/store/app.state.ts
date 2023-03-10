import { Status } from '@esm/cdk';
import {
  ExaminationSummary,
  FacultyWithDepartments,
  UserSummary,
} from '@esm/data';

type UserState = {
  showLoader: boolean | null;
  user: UserSummary | null;
  userStatus: Status;
};

type ExaminationState = {
  examinationId: string | null;
  examination: ExaminationSummary | null;
  examinationStatus: Status;
};

type RelatedExaminationsState = {
  relatedExaminations: ExaminationSummary[];
  relatedExaminationsStatus: Status;
  relatedExaminationsError: string | null;
};

type DepartmentsState = {
  departments: FacultyWithDepartments[];
  departmentsStatus: Status;
  departmentsError: string | null;
};

export type AppState = UserState &
  ExaminationState &
  RelatedExaminationsState &
  DepartmentsState;
