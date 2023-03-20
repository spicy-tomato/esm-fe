import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExaminationStatus } from '@esm/data';
import { LetModule } from '@ngrx/component';
import { tuiButtonOptionsProvider } from '@taiga-ui/core';
import { ExaminationDataStore } from './data.store';
import { ExaminationDataImportComponent } from './import/import.component';
import { ExaminationDataTableComponent } from './table/table.component';
import { ExaminationDataTemporaryTableComponent } from './temporary-table/temporary-table.component';

export const NGRX = [LetModule];

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ExaminationDataImportComponent,
    ExaminationDataTableComponent,
    ExaminationDataTemporaryTableComponent,
    ...NGRX,
  ],
  providers: [ExaminationDataStore, tuiButtonOptionsProvider({ size: 'm' })],
})
export class ExaminationDataComponent {
  // PUBLIC PROPERTIES
  readonly examination$ = this.store.examination$;
  readonly ExaminationStatus = ExaminationStatus;

  // CONSTRUCTOR
  constructor(private readonly store: ExaminationDataStore) {}
}
