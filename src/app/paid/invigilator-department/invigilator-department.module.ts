import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaidInvigilatorDepartmentComponent } from './invigilator-department.component';
import { PaidInvigilatorDepartmentRoutingModule } from './invigilator-department.routing';

@NgModule({
  declarations: [PaidInvigilatorDepartmentComponent],
  imports: [CommonModule, PaidInvigilatorDepartmentRoutingModule],
  exports: [PaidInvigilatorDepartmentComponent],
})
export class PaidInvigilatorDepartmentModule {}
