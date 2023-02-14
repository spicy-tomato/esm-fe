import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExaminationCreateRoutingModule } from './create.routing';
import { ExaminationCreateComponent } from './create.component';

@NgModule({
  imports: [CommonModule, ExaminationCreateRoutingModule],
  declarations: [ExaminationCreateComponent],
  exports: [ExaminationCreateComponent],
})
export class CreateModule {}
