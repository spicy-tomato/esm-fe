import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ExamMethodPipe } from '@esm/core';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLoaderModule, TuiScrollbarModule } from '@taiga-ui/core';
import { ExaminationDataFinalStore } from '../final.store';
import { TuiLineClampModule } from '@taiga-ui/kit';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiLineClampModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiTableModule,
];

@Component({
  selector: 'esm-examination-data-final-table',
  standalone: true,
  imports: [
    CommonModule,
    ExamMethodPipe,
    ScrollingModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExaminationDataFinalTableComponent {
  // INJECT PROPERTIES
  private readonly store = inject(ExaminationDataFinalStore);

  // PUBLIC PROPERTIES
  readonly columns = [
    'index',
    'moduleId',
    'moduleName',
    'credit',
    'method',
    'date',
    'startAt',
    'shift',
    'room',
    'candidatesCount',
    'departmentAssign',
  ];
  readonly data$ = this.store.displayData$;
}
