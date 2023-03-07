import { Injectable } from '@angular/core';
import { ObservableHelper } from '@esm/cdk';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';

type ExaminationDataState = {};

@Injectable()
export class ExaminationDataStore extends ComponentStore<ExaminationDataState> {
  // PUBLIC PROPERTIES
  readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // CONSTRUCTOR
  constructor(private readonly appStore: Store<AppState>) {
    super({});
  }
}
