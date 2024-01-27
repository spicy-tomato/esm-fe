import { inject, Injectable } from '@angular/core';
import { AppPageAction, AppSelector, AppState } from '@esm/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { combineLatest, map, takeUntil } from 'rxjs';

@Injectable()
export class TopBarStore extends ComponentStore<Record<string, never>> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<AppState>);

  // GLOBAL SELECTORS
  readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(takeUntil(this.destroy$));

  readonly examinationStatus$ = this.appStore
    .select(AppSelector.examinationStatus)
    .pipe(takeUntil(this.destroy$));

  private readonly userName$ = this.appStore.pipe(AppSelector.userName);

  private readonly roles$ = this.appStore.select(AppSelector.roles);

  private readonly userTitle$ = this.appStore.pipe(
    AppSelector.userTitle(false),
  );

  private readonly relatedStatus$ = this.appStore
    .select(AppSelector.relatedExaminationsStatus)
    .pipe(takeUntil(this.destroy$));

  private readonly relatedExaminations$ = this.appStore
    .select(AppSelector.relatedExaminations)
    .pipe(takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  private readonly isInvigilator$ = this.roles$.pipe(
    map((r) => r.includes('ExaminationDepartmentHead')),
  );

  readonly navObservables$ = combineLatest([
    this.examinationStatus$,
    this.userTitle$,
    this.userName$,
    this.isInvigilator$,
    this.relatedStatus$,
    this.relatedExaminations$,
  ]).pipe(
    map(
      ([
        examinationStatus,
        userTitle,
        userName,
        isInvigilator,
        relatedStatus,
        relatedExaminations,
      ]) => ({
        examinationStatus,
        userTitle,
        userName,
        isInvigilator,
        relatedStatus,
        relatedExaminations,
      }),
    ),
  );

  // CONSTRUCTOR
  constructor() {
    super({});
  }

  // PUBLIC METHODS
  logOut(): void {
    this.appStore.dispatch(AppPageAction.logOut());
  }
}
