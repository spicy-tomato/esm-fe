import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataWrapperComponent } from './wrapper.component';
import { DataWrapperRoutingModule } from './wrapper.routing';
import { TuiLinkModule } from '@taiga-ui/core';

export const TAIGA_UI = [TuiLinkModule];

@NgModule({
  imports: [CommonModule, DataWrapperRoutingModule, ...TAIGA_UI],
  declarations: [DataWrapperComponent],
  exports: [DataWrapperComponent],
})
export class DataWrapperModule {}
