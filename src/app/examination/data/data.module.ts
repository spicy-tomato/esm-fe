import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { ExaminationDataComponent } from './data.component';
import { ExaminationDataRoutingModule } from './data.routing';
import { ExaminationDataImportModule } from './import/import.module';
import { ExaminationDataTableModule } from './table/table.module';
import { ExaminationDataTemporaryTableModule } from './temporary-table/temporary-table.module';

export const NGRX = [LetModule];
// export const TAIGA_UI = [TuiButtonModule, TuiInputFilesModule, TuiLoaderModule];

@NgModule({
  imports: [
    CommonModule,
    ExaminationDataImportModule,
    ExaminationDataTableModule,
    ExaminationDataTemporaryTableModule,
    ExaminationDataRoutingModule,
    ...NGRX,
    // ...TAIGA_UI,
  ],
  declarations: [ExaminationDataComponent],
  exports: [ExaminationDataComponent],
})
export class ExaminationDataModule {}
