import {
  ChangeDetectorRef,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ObservableHelper } from '@esm/cdk';
import { AppSelector, AppState } from '@esm/store';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { combineLatest, Observable, Subject, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[esmRole]',
  providers: [TuiDestroyService],
})
export class RoleDirective {
  // PRIVATE PROPERTIES
  private _esmRole?: string[] | null;
  private role: Observable<string | undefined>;
  private bind$ = new Subject<void>();
  private hadElse = false;

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
  constructor(
    private readonly thenTemplateRef: TemplateRef<unknown>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly cdr: ChangeDetectorRef,
    private elseThenTemplateRef: TemplateRef<unknown>,
    appStore: Store<AppState>,
    destroy$: TuiDestroyService
  ) {
    this.role = appStore.select(AppSelector.role).pipe(takeUntil(destroy$));

    this.triggerUpdateView();
  }

  // PRIVATE METHODS
  private triggerUpdateView(): void {
    combineLatest([
      this.role.pipe(ObservableHelper.filterNullish()),
      this.bind$,
    ])
      .pipe(tap(([role]) => this.updateView(role)))
      .subscribe();
  }

  private updateView(userRole: string): void {
    const accept = this._esmRole;
    this.viewContainerRef.clear();

    if (!accept || accept.includes(userRole)) {
      this.viewContainerRef.createEmbeddedView(this.thenTemplateRef);
      this.cdr.detectChanges();
    } else if (this.hadElse) {
      this.viewContainerRef.createEmbeddedView(this.elseThenTemplateRef);
      this.cdr.detectChanges();
    }
  }
}
