import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiIslandModule, TuiProgressModule } from '@taiga-ui/kit';

export const TAIGA_UI = [TuiIslandModule, TuiProgressModule];

@Component({
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ...TAIGA_UI],
})
export class ExaminationProcessComponent {
  startDate = new Date(2023, 5, 1);
  endDate = new Date(2023, 5, 30);
  modulesCount = 100;
  subjectsCount = 1000;
  candidatesCount = 10000;
  invigilatorsCount = 1000;
}
