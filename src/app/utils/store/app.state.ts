import { Status } from '@esm/cdk';
import { UserSummary } from '@esm/data';
import { BreadcrumbItem } from '@esm/shared/components';

export interface AppState {
  user: UserSummary | null;
  status: Status;
  breadcrumbs: BreadcrumbItem[];
}
