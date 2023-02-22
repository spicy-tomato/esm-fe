import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataInvigilatorComponent } from './invigilator.component';
import { DataInvigilatorRoutingModule } from './invigilator.routing';

@NgModule({
  declarations: [DataInvigilatorComponent],
  imports: [CommonModule, DataInvigilatorRoutingModule],
})
export class DataInvigilatorModule {}
