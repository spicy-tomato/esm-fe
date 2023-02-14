import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeOut } from '@esm/core';
import { AppSelector, AppState } from '@esm/store';
import { Store } from '@ngrx/store';
import { concatMap, delayWhen, interval, of } from 'rxjs';

@Component({
  selector: 'esm-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeOut],
})
export class LoaderComponent {
  // PUBLIC PROPERTIES
  showLoader$ = this.appStore
    .select(AppSelector.showLoader)
    .pipe(
      concatMap((x) =>
        of(x).pipe(delayWhen((x) => (x ? of(null) : interval(500))))
      )
    );

  // CONSTRUCTOR
  constructor(private readonly appStore: Store<AppState>) {}
}
