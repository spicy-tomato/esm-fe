import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'esm-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {}
