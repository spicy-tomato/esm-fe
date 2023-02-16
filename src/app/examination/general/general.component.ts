import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExaminationGeneralComponent {}
