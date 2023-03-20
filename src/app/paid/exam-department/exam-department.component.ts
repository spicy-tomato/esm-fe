import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './exam-department.component.html',
  styleUrls: ['./exam-department.component.less'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaidExamDepartmentComponent {}
