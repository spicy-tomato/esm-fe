import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExaminationDocumentComponent } from './document.component';
import { ExaminationDocumentRoutingModule } from './document.routing';

@NgModule({
  imports: [CommonModule, ExaminationDocumentRoutingModule],
  declarations: [ExaminationDocumentComponent],
  exports: [ExaminationDocumentComponent],
})
export class ExaminationDocumentModule {}
