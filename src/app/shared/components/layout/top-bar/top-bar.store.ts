import { inject, Injectable } from '@angular/core';
import { StringHelper } from '@esm/cdk';
import { AppPageAction, AppSelector, AppState } from '@esm/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { combineLatest, map, takeUntil } from 'rxjs';

@Injectable()
export class TopBarStore extends ComponentStore<{}> {
  // INJECT PROPERTIES
  private readonly appStore = inject(Store<AppState>);

  // GLOBAL SELECTORS
  readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(takeUntil(this.destroy$));

  readonly examinationStatus$ = this.appStore
    .select(AppSelector.examinationStatus)
    .pipe(takeUntil(this.destroy$));

  private readonly user$ = this.appStore.pipe(AppSelector.notNullUser);
  private readonly role$ = this.appStore.select(AppSelector.role);

  private readonly userTitle$ = this.appStore.pipe(
    AppSelector.userTitle(false)
  );

  private readonly relatedStatus$ = this.appStore
    .select(AppSelector.relatedExaminationsStatus)
    .pipe(takeUntil(this.destroy$));

  private readonly relatedExaminations$ = this.appStore
    .select(AppSelector.relatedExaminations)
    .pipe(takeUntil(this.destroy$));

  // CUSTOM SELECTORS
  private readonly userName$ = this.user$.pipe(
    map(({ fullName }) => StringHelper.getFirstName(fullName))
  );

  private readonly isInvigilator$ = this.role$.pipe(
    map((r) => r === 'ExaminationDepartmentHead')
  );

  readonly navObservables$ = combineLatest([
    this.examinationStatus$,
    this.userTitle$,
    this.userName$,
    this.isInvigilator$,
  ]).pipe(
    map(([examinationStatus, userTitle, userName, isInvigilator]) => ({
      examinationStatus,
      userTitle,
      userName,
      isInvigilator,
    }))
  );

  readonly dropdownObservables$ = combineLatest([
    this.relatedStatus$,
    this.relatedExaminations$,
  ]).pipe(
    map(([relatedStatus, relatedExaminations]) => ({
      relatedStatus,
      relatedExaminations,
    }))
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
