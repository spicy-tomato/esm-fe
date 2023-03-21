import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { fadeOut } from '@esm/core';
import { AppSelector, AppState } from '@esm/store';
import { LetModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { concatMap, delayWhen, interval, of } from 'rxjs';

export const NGRX = [LetModule];

@Component({
  selector: 'esm-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less'],
  standalone: true,
  imports: [CommonModule, ...NGRX],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeOut],
})
export class LoaderComponent {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<AppState>);

  // PUBLIC PROPERTIES
  showLoader$ = this.appStore
    .select(AppSelector.showLoader)
    .pipe(
      concatMap((x) =>
        of(x).pipe(delayWhen((x) => (x ? of(null) : interval(500))))
      )
    );
}
