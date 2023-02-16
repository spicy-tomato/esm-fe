import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvigilatorDataRoutingModule } from './data.routing';
import { InvigilatorDataComponent } from './data.component';

@NgModule({
  declarations: [InvigilatorDataComponent],
  imports: [CommonModule, InvigilatorDataRoutingModule],
  exports: [InvigilatorDataComponent],
})
export class InvigilatorDataModule {}
