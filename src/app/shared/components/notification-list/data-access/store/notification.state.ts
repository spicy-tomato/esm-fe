import { Status } from '@esm/cdk';
import { EchoMessage } from '../models';

export type NotificationType = {
  data: EchoMessage[];
  status: Status;
  error: string | null;
  hasNext: boolean;
  milestone: string | null;
};

export interface NotificationState {
  all: NotificationType;
  unread: NotificationType;
}
