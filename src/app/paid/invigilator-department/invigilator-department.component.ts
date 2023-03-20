import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './invigilator-department.component.html',
  styleUrls: ['./invigilator-department.component.less'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaidInvigilatorDepartmentComponent {}
