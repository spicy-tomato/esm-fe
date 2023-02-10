import { UserSummary } from '@esm/data';
import { createAction, props } from '@ngrx/store';

export class AppApiAction {
  static readonly noCacheUserInfo = createAction(
    '[App/API] No cache user info'
  );
  static readonly getUserInfoSuccessful = createAction(
    '[App/API] Get user info successful',
    props<{ user: UserSummary }>()
  );
  static readonly getUserInfoFailed = createAction(
    '[App/API] Get user info failed'
  );
}
