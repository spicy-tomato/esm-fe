import { ChangeDetectionStrategy, Component } from '@angular/core';
import { routerFade } from '@esm/core';
import { AppSelector, AppState } from '@esm/store';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { Observable, takeUntil } from 'rxjs';
import { BreadcrumbItem } from '../../breadcrumbs';

@Component({
  selector: 'esm-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
  animations: [routerFade],
})
export class MainViewComponent {
  // PUBLIC METHODS
  readonly breadcrumbs$: Observable<BreadcrumbItem[]>;

  // CONSTRUCTOR
  constructor(
    private readonly destroy$: TuiDestroyService,
    appStore: Store<AppState>
  ) {
    this.breadcrumbs$ = appStore
      .select(AppSelector.breadcrumbs)
      .pipe(takeUntil(this.destroy$));
  }
}
