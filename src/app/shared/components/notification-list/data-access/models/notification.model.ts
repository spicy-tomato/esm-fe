import { EchoMessage } from './echo.model';

export interface NotificationPage {
  data: EchoMessage[];
  hasNext: boolean;
  milestone: string | null;
}
