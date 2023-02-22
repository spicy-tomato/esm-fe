import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataDepartmentRoutingModule } from './department.routing';
import { DataDepartmentComponent } from './department.component';

@NgModule({
  declarations: [DataDepartmentComponent],
  imports: [CommonModule, DataDepartmentRoutingModule],
})
export class DataDepartmentModule {}
