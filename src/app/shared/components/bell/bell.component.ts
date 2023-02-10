import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'esm-bell',
  templateUrl: './bell.component.html',
  styleUrls: ['./bell.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BellComponent {}
