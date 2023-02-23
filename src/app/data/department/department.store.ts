import { Injectable } from '@angular/core';
import { AppPageAction, AppSelector, AppState } from '@esm/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';

@Injectable()
export class DataDepartmentStore extends ComponentStore<{}> {
  // PUBLIC PROPERTIES
  readonly departments$ = this.appStore
    .select(AppSelector.departmentsWithFaculty)
    .pipe(takeUntil(this.destroy$));
  readonly status$ = this.appStore
    .select(AppSelector.departmentsStatus)
    .pipe(takeUntil(this.destroy$));

  // CONSTRUCTOR
  constructor(private readonly appStore: Store<AppState>) {
    super({});
  }

  // PUBLIC METHODS
  load(): void {
    this.appStore.dispatch(AppPageAction.getDepartments());
  }
}
