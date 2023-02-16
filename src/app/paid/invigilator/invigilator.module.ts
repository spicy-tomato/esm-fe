import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaidInvigilatorComponent } from './invigilator.component';
import { PaidInvigilatorRoutingModule } from './invigilator.routing';

@NgModule({
  declarations: [PaidInvigilatorComponent],
  imports: [CommonModule, PaidInvigilatorRoutingModule],
  exports: [PaidInvigilatorComponent],
})
export class PaidInvigilatorModule {}
