import { Injectable } from '@angular/core';
import { AppPageAction, AppSelector, AppState } from '@esm/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { combineLatest, map, takeUntil, tap } from 'rxjs';

type DataDepartmentState = {
  selectedFacultyId: string;
};

@Injectable()
export class DataDepartmentStore extends ComponentStore<DataDepartmentState> {
  // PUBLIC PROPERTIES
  readonly faculties$ = this.appStore
    .select(AppSelector.faculties)
    .pipe(takeUntil(this.destroy$));
  readonly departments$ = this.appStore
    .select(AppSelector.departmentsWithFaculty)
    .pipe(takeUntil(this.destroy$));
  readonly status$ = this.appStore
    .select(AppSelector.departmentsStatus)
    .pipe(takeUntil(this.destroy$));
  readonly selectedFacultyId$ = this.select((s) => s.selectedFacultyId);
  readonly selectedFacultyName$ = combineLatest([
    this.faculties$,
    this.selectedFacultyId$,
  ]).pipe(
    map(([faculties, id]) => faculties.find((f) => f.id === id)?.name || '')
  );

  // EFFECTS
  readonly changeSelectedFaculty = this.effect<string>((params$) =>
    params$.pipe(tap((id) => this.patchState({ selectedFacultyId: id })))
  );

  // CONSTRUCTOR
  constructor(private readonly appStore: Store<AppState>) {
    super({
      selectedFacultyId: '',
    });
  }

  // PUBLIC METHODS
  load(): void {
    this.appStore.dispatch(AppPageAction.getDepartments());
  }
}
