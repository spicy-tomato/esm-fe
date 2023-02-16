import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaidDataComponent } from './data.component';
import { PaidDataRoutingModule } from './data.routing';

@NgModule({
  declarations: [PaidDataComponent],
  imports: [CommonModule, PaidDataRoutingModule],
  exports: [PaidDataComponent],
})
export class PaidDataModule {}
