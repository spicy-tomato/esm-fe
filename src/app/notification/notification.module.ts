import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification.routing';
import { NotificationComponent } from './notification.component';

@NgModule({
  imports: [CommonModule, NotificationRoutingModule],
  declarations: [NotificationComponent],
})
export class NotificationModule {}
