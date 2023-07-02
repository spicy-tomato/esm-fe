import {
  ChangeDetectorRef,
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ObservableHelper } from '@esm/cdk';
import { AppSelector, AppState } from '@esm/store';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { combineLatest, Subject, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[esmRole]',
  providers: [TuiDestroyService],
  standalone: true,
})
export class RoleDirective {
  // INJECT PROPERTIES
  private elseThenTemplateRef = inject(TemplateRef<unknown>);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly appStore = inject(Store<AppState>);
  private readonly destroy$ = inject(TuiDestroyService);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly thenTemplateRef = inject(TemplateRef<unknown>);

  // PRIVATE PROPERTIES
  private _esmRole?: string[] | null;
  private hadElse = false;
  private readonly bind$ = new Subject<void>();
  private readonly role$ = this.appStore
    .select(AppSelector.roles)
    .pipe(takeUntil(this.destroy$));

  // SETTER
  @Input() set esmRole(acceptRoles: string[] | undefined | null) {
    this._esmRole = acceptRoles;
    this.bind$.next();
  }

  @Input() set esmRoleElse(templateRef: TemplateRef<unknown>) {
    this.elseThenTemplateRef = templateRef;
    this.hadElse = true;
    this.bind$.next();
  }

  // CONSTRUCTOR
  constructor() {
    this.triggerUpdateView();
  }

  // PRIVATE METHODS
  private triggerUpdateView(): void {
    combineLatest([
      this.role$.pipe(ObservableHelper.filterNullish()),
      this.bind$,
    ])
      .pipe(tap(([roles]) => this.updateView(roles)))
      .subscribe();
  }

  private updateView(userRoles: string[]): void {
    const accept = this._esmRole;
    this.viewContainerRef.clear();

    if (!accept || accept.find((r) => userRoles.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.thenTemplateRef);
      this.cdr.detectChanges();
    } else if (this.hadElse) {
      this.viewContainerRef.createEmbeddedView(this.elseThenTemplateRef);
      this.cdr.detectChanges();
    }
  }
}
