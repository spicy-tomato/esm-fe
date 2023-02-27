import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaminationDataImportComponent } from './import.component';
import { LetModule } from '@ngrx/component';
import { TuiInputFilesModule } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';

export const NGRX = [LetModule];
export const TAIGA_UI = [TuiInputFilesModule];

@NgModule({
  imports: [CommonModule, FormsModule, ...NGRX, ...TAIGA_UI],
  declarations: [ExaminationDataImportComponent],
  exports: [ExaminationDataImportComponent],
})
export class ExaminationDataImportModule {}
