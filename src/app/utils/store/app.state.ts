import { Status } from 'src/cdk';
import { UserSummary } from 'src/data/models';

export interface AppState {
  user: UserSummary | null;
  status: Status;
}
