import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataDepartmentComponent {}
