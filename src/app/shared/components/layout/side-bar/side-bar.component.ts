import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideBarConstant } from './side-bar.constant';
import { SideBarStore } from './side-bar.store';

@Component({
  selector: 'esm-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SideBarStore],
})
export class SideBarComponent {
  // PUBLIC PROPERTIES
  readonly items = SideBarConstant.items;
  readonly examinationId$ = this.store.examinationId$;

  // CONSTRUCTOR
  constructor(private readonly store: SideBarStore) {}
}
