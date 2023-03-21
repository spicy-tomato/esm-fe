import { inject, Injectable } from '@angular/core';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';

@Injectable()
export class SideBarStore extends ComponentStore<{}> {
  // INJECT PROPERTIES
  private readonly store = inject(Store<AppState>);

  // PROPERTIES
  readonly examinationId$ = this.store.select(AppSelector.examinationId);

  // CONSTRUCTOR
  constructor() {
    super({});
  }
}
