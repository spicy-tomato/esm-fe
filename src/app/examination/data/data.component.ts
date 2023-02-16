import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExaminationDataComponent {}
