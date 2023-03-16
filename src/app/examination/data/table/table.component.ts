import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ExaminationDataTableStore } from './table.store';

@Component({
  selector: 'esm-examination-data-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
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
