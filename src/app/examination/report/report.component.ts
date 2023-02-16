import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExaminationReportComponent {}
