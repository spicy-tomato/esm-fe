import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ObservableHelper } from '@esm/cdk';
import { AppPageAction, AppSelector } from '@esm/store';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { takeUntil, tap } from 'rxjs';
import { AppState } from './utils/store/app.state';

@Component({
  selector: 'esm-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class AppComponent implements OnInit {
  private readonly appStore = inject(Store<AppState>);
  private readonly destroy$ = inject(TuiDestroyService);
  private readonly user$ = this.appStore
    .select(AppSelector.user)
    .pipe(takeUntil(this.destroy$));

  // LIFECYCLE
  ngOnInit(): void {
    this.triggerGetRelatedExaminations();
    this.appStore.dispatch(AppPageAction.getUserInfo());
  }

  // PRIVATE METHODS
  private triggerGetRelatedExaminations(): void {
    this.user$
      .pipe(
        ObservableHelper.filterNullish(),
        tap(() => {
          this.appStore.dispatch(AppPageAction.getRelatedExaminations());
          this.appStore.dispatch(AppPageAction.getDepartments());
        })
      )
      .subscribe();
  }
}
