import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamMethodPipe } from './exam-method.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ExamMethodPipe],
  exports: [ExamMethodPipe],
})
export class ExamMethodPipeModule {}
