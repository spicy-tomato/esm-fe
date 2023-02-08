import { createAction } from '@ngrx/store';

export class AppPageAction {
  static readonly getUserInfo = createAction('[App/Page] Get user info');
  static readonly logOut = createAction('[App/Page] Log out');
}
