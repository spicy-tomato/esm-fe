import { Status } from '@esm/cdk';
import { UserSummary } from '@esm/data';

export interface AppState {
  user: UserSummary | null;
  status: Status;
}
