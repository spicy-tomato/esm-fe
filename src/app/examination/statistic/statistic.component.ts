import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticComponent {
  startDate = new Date(2023, 5, 1);
  endDate = new Date(2023, 5, 30);
  modulesCount = 100;
  subjectsCount = 1000;
  candidatesCount = 10000;
  invigilatorsCount = 1000;
}
