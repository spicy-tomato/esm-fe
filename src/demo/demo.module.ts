import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@esm/shared/components';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo.routing';

@NgModule({
  imports: [CommonModule, DemoRoutingModule, LayoutModule],
  declarations: [DemoComponent],
})
export class DemoModule {}
