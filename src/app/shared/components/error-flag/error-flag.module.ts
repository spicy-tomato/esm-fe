import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorFlagComponent } from './error-flag.component';
import { TuiDropdownModule } from '@taiga-ui/core';

const TAIGA_UI = [TuiDropdownModule];

@NgModule({
  imports: [CommonModule, ...TAIGA_UI],
  declarations: [ErrorFlagComponent],
  exports: [ErrorFlagComponent],
})
export class ErrorFlagModule {}
