import { inject, Injectable } from '@angular/core';
import { ObservableHelper } from '@esm/cdk';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { map, takeUntil } from 'rxjs';

@Injectable()
export class SafeExaminationDataStore extends ComponentStore<{}> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<AppState>);

  // GLOBAL SELECTORS
  private readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  readonly examinationStatus$ = this.examination$.pipe(
    ObservableHelper.filterNullish(),
    map((examination) => examination.status)
  );
}
