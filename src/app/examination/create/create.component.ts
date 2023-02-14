import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'esm-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExaminationCreateComponent {}
