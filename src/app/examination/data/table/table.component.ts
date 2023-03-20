import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ExamMethodPipe } from '@esm/core';
import { VarDirective } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { ExaminationDataTableStore } from './table.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiTableModule,
];

@Component({
  selector: 'esm-examination-data-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    VarDirective,
    ExamMethodPipe,
    ScrollingModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExaminationDataTableStore],
})
export class ExaminationDataTableComponent implements OnInit {
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
  readonly status$ = this.store.status$;
  readonly data$ = this.store.data$;

  // CONSTRUCTOR
  constructor(private readonly store: ExaminationDataTableStore) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.store.getData();
  }
}
