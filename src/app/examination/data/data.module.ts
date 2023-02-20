import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiInputFilesModule } from '@taiga-ui/kit';
import { ExaminationDataComponent } from './data.component';
import { ExaminationDataRoutingModule } from './data.routing';
import { ExaminationDataTableModule } from './table/table.module';

export const NGRX = [LetModule];
export const TAIGA_UI = [TuiButtonModule, TuiInputFilesModule, TuiLoaderModule];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExaminationDataTableModule,
    ExaminationDataRoutingModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [ExaminationDataComponent],
  exports: [ExaminationDataComponent],
})
export class ExaminationDataModule {}
