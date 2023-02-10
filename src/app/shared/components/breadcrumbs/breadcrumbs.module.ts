import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumbs.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
