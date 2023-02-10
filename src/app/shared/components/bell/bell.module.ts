import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BellComponent } from './bell.component';

@NgModule({
  declarations: [BellComponent],
  exports: [BellComponent],
  imports: [CommonModule],
})
export class BellModule {}
