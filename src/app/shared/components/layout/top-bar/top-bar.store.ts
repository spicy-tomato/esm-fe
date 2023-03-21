import { inject, Injectable } from '@angular/core';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';

@Injectable()
export class TopBarStore extends ComponentStore<{}> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<AppState>);

  // PROPERTIES
  readonly relatedStatus$ = this.appStore
    .select(AppSelector.relatedExaminationsStatus)
    .pipe(takeUntil(this.destroy$));
  readonly relatedExaminations$ = this.appStore
    .select(AppSelector.relatedExaminations)
    .pipe(takeUntil(this.destroy$));
  readonly examinationStatus$ = this.appStore
    .select(AppSelector.examinationStatus)
    .pipe(takeUntil(this.destroy$));
  readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(takeUntil(this.destroy$));

  // CONSTRUCTOR
  constructor() {
    super({});
  }
}
