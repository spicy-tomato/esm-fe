import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataWrapperComponent {}
