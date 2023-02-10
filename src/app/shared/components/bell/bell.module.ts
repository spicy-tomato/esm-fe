import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BellComponent } from './bell.component';



@NgModule({
  declarations: [
    BellComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BellComponent
  ]
})
export class BellModule { }
