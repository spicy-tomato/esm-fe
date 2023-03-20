import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './invigilator.component.html',
  styleUrls: ['./invigilator.component.less'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaidInvigilatorComponent {}
