import { createAction, props } from '@ngrx/store';

export class AppPageAction {
  static readonly getUserInfo = createAction('[App/Page] Get user info');
  static readonly logOut = createAction('[App/Page] Log out');
  static readonly getRelatedExaminations = createAction(
    '[App/Page] Get related examinations'
  );
  static readonly getDepartments = createAction('[App/Page] Get departments');
  static readonly getExaminationSummary = createAction(
    '[App/Page] Get examination summary',
    props<{ id: string }>()
  );
}
