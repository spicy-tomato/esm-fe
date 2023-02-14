import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { routerFade } from '@esm/core';

@Component({
  selector: 'esm-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerFade],
})
export class MainViewComponent {
  // INPUT
  @Input() isInCommonPage!: boolean;
}
