import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExaminationStatus } from '@esm/data';
import { tuiButtonOptionsProvider } from '@taiga-ui/core';
import { ExaminationDataStore } from './data.store';

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExaminationDataStore, tuiButtonOptionsProvider({ size: 'm' })],
})
export class ExaminationDataComponent {
  // PUBLIC PROPERTIES
  readonly examination$ = this.store.examination$;
  readonly ExaminationStatus = ExaminationStatus;

  // CONSTRUCTOR
  constructor(private readonly store: ExaminationDataStore) {}
}
