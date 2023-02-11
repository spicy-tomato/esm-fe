import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './utils/store/app.state';

@Component({
  selector: 'esm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // CONSTRUCTOR
  constructor(appStore: Store<AppState>) {
    // TODO: Uncomment below
    // appStore.dispatch(AppPageAction.getUserInfo());
  }
}
