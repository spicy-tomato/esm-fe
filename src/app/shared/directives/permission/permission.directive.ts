import {
  ChangeDetectorRef,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { AppSelector, AppState } from '@esm/store';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  combineLatest,
  filter,
  Observable,
  Subject,
  takeUntil,
  tap
} from 'rxjs';

@Directive({
  selector: '[esmPermission]',
  providers: [TuiDestroyService],
})
export class PermissionDirective {
  // PRIVATE PROPERTIES
  private _esmPermission?: number | null;
  private permissions$: Observable<number[]>;
  private bind$ = new Subject<void>();
  private hadElse = false;

  // SETTER
  @Input() set esmPermission(permissions: number | undefined | null) {
    this._esmPermission = permissions;
    this.bind$.next();
  }

  @Input() set esmPermissionElse(templateRef: TemplateRef<unknown>) {
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
    this.permissions$ = appStore
      .select(AppSelector.permissions)
      .pipe(takeUntil(destroy$));

    this.triggerUpdateView();
  }

  // PRIVATE METHODS
  private triggerUpdateView(): void {
    combineLatest([this.permissions$.pipe(filter((x) => !!x)), this.bind$])
      .pipe(tap(([permissions]) => this.updateView(permissions)))
      .subscribe();
  }

  private updateView(permissions?: number[]): void {
    const accept = this._esmPermission;
    this.viewContainerRef.clear();
    if (!accept || permissions?.includes(accept)) {
      this.viewContainerRef.createEmbeddedView(this.thenTemplateRef);
      this.cdr.detectChanges();
    } else if (this.hadElse) {
      this.viewContainerRef.createEmbeddedView(this.elseThenTemplateRef);
      this.cdr.detectChanges();
    }
  }
}
