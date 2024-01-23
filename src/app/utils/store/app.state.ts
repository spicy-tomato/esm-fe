import {
  GetAllFacultyData,
  GetMySummaryInfoData,
  GetSummaryData,
} from '@esm/api';
import { State, Status } from '@esm/cdk';
import { GetRelatedResponseItem } from '@esm/data';

type UserState = {
  showLoader: boolean | null;
  user: GetMySummaryInfoData['data'] | null;
  userStatus: Status;
};

type ExaminationState = {
  examinationId: string | null;
  examination: GetSummaryData['data'] | null;
  examinationStatus: Status;
};

type RelatedExaminationsState = State<
  GetRelatedResponseItem[],
  'relatedExaminations'
>;

type DepartmentsState = State<GetAllFacultyData['data'], 'departments'>;

export type AppState = UserState &
  ExaminationState &
  RelatedExaminationsState &
  DepartmentsState;
