import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  startDate = new Date(2023, 5, 1);
  endDate = new Date(2023, 5, 30);
  modulesCount = 100;
  subjectsCount = 1000;
  candidatesCount = 10000;
  invigilatorsCount = 1000;
}
