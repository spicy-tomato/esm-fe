import { Injectable } from '@angular/core';
import { AppSelector, AppState } from '@esm/store';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';

@Injectable()
export class SideBarStore extends ComponentStore<{}> {
  // PROPERTIES
  readonly examinationId$ = this.store.select(AppSelector.examinationId);

  // CONSTRUCTOR
  constructor(private readonly store: Store<AppState>) {
    super({});
  }
}
