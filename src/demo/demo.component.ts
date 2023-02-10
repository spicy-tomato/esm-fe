import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'esm-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {}
