import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'esm-error-flag',
  templateUrl: './error-flag.component.html',
  styleUrls: ['./error-flag.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorFlagComponent {
  @Input() error?: string;
}
