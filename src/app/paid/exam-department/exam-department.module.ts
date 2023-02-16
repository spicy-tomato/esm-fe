import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaidExamDepartmentComponent } from './exam-department.component';
import { PaidExamDepartmentRoutingModule } from './exam-department.routing';

@NgModule({
  declarations: [PaidExamDepartmentComponent],
  imports: [CommonModule, PaidExamDepartmentRoutingModule],
  exports: [PaidExamDepartmentComponent],
})
export class PaidExamDepartmentModule {}
