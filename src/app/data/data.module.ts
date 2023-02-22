import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiActionModule } from '@taiga-ui/kit';
import { DataComponent } from './data.component';
import { DataRoutingModule } from './data.routing';

export const TAIGA_UI = [TuiActionModule];

@NgModule({
  imports: [CommonModule, DataRoutingModule,...TAIGA_UI],
  declarations: [DataComponent],
})
export class DataModule {}
