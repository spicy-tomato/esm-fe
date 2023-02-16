import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ObservableHelper } from '@esm/core';
import { AppPageAction, AppSelector } from '@esm/store';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { takeUntil, tap } from 'rxjs';
import { AppState } from './utils/store/app.state';

@Component({
  selector: 'esm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class AppComponent {
  private readonly user$ = this.appStore
    .select(AppSelector.user)
    .pipe(takeUntil(this.destroy$));

  // CONSTRUCTOR
  constructor(
    private readonly appStore: Store<AppState>,
    private readonly destroy$: TuiDestroyService
  ) {
    this.triggerGetRelatedExaminations();

    appStore.dispatch(AppPageAction.getUserInfo());
  }

  // PRIVATE METHODS
  private triggerGetRelatedExaminations(): void {
    this.user$
      .pipe(
        ObservableHelper.filterNullish(),
        tap(() =>
          this.appStore.dispatch(AppPageAction.getRelatedExaminations())
        )
      )
      .subscribe();
  }
}
