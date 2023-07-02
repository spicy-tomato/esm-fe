import { State, Status } from '@esm/cdk';
import {
  ExaminationSummary,
  FacultyWithDepartments,
  GetRelatedResponseItem,
  MySummaryInfoResponse,
} from '@esm/data';

type UserState = {
  showLoader: boolean | null;
  user: MySummaryInfoResponse | null;
  userStatus: Status;
};

type ExaminationState = {
  examinationId: string | null;
  examination: ExaminationSummary | null;
  examinationStatus: Status;
};

type RelatedExaminationsState = State<
  GetRelatedResponseItem[],
  'relatedExaminations'
>;

type DepartmentsState = State<FacultyWithDepartments[], 'departments'>;

export type AppState = UserState &
  ExaminationState &
  RelatedExaminationsState &
  DepartmentsState;
