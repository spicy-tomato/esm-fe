import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routerFade } from '@esm/core';
import { LetModule } from '@ngrx/component';
import { TuiScrollbarModule } from '@taiga-ui/core';

const NGRX = [LetModule];
export const TAIGA_UI = [TuiScrollbarModule];

@Component({
  selector: 'esm-main-view',
  templateUrl: './main-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, ...NGRX, TAIGA_UI],
  animations: [routerFade],
})
export class MainViewComponent {
  // INPUT
  @Input() isInCommonPage!: boolean;
}
