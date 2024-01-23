import {
  ChangeDetectorRef,
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ESMDomainEnumsExaminationStatus, GetSummaryData } from '@esm/api';
import { ObservableHelper } from '@esm/cdk';
import { AppSelector, AppState } from '@esm/store';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { combineLatest, Subject, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[esmMinimumExaminationStatus]',
  standalone: true,
  providers: [TuiDestroyService],
})
export class MinimumExaminationStatusDirective {
  // INJECT PROPERTIES
  private readonly cdr = inject(ChangeDetectorRef);
  private elseTemplateRef: TemplateRef<MinimumExaminationStatusContext> | null =
    null;
  private readonly appStore = inject(Store<AppState>);
  private readonly destroy$ = inject(TuiDestroyService);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly thenTemplateRef = inject(
    TemplateRef<MinimumExaminationStatusContext>,
  );

  // INPUTS
  @Input('esmMinimumExaminationStatus')
  set minimumStatus(status: ESMDomainEnumsExaminationStatus | null) {
    this._minimumStatus = status;
    this.bind$.next();
  }

  @Input()
  set esmMinimumExaminationStatusElse(
    templateRef: TemplateRef<MinimumExaminationStatusContext> | null,
  ) {
    this.elseTemplateRef = templateRef;
    this.bind$.next();
  }

  @Input()
  esmMinimumExaminationStatusLoad: Function = () => null;

  // PRIVATE PROPERTIES
  private _minimumStatus!: ESMDomainEnumsExaminationStatus | null;
  private readonly bind$ = new Subject<void>();

  private readonly examination$ = this.appStore
    .select(AppSelector.examination)
    .pipe(ObservableHelper.filterNullish(), takeUntil(this.destroy$));

  // CONSTRUCTOR
  constructor() {
    this.triggerUpdateView();
  }

  // PRIVATE METHODS
  private triggerUpdateView(): void {
    combineLatest([this.examination$, this.bind$])
      .pipe(tap(([examination]) => this.updateView(examination)))
      .subscribe();
  }

  private updateView(examination: GetSummaryData['data']): void {
    const currentStatus = examination.status;
    const context = new MinimumExaminationStatusContext(
      this._minimumStatus,
      currentStatus,
      examination,
    );

    this.viewContainerRef.clear();

    if (this._minimumStatus === null || currentStatus >= this._minimumStatus) {
      this.viewContainerRef.createEmbeddedView(this.thenTemplateRef, context);
      this.cdr.detectChanges();
      this.esmMinimumExaminationStatusLoad();
    } else if (this.elseTemplateRef) {
      this.viewContainerRef.createEmbeddedView(this.elseTemplateRef, context);
      this.cdr.detectChanges();
    }
  }
}

export class MinimumExaminationStatusContext {
  constructor(
    public $implicit: ESMDomainEnumsExaminationStatus | null = null,
    public status: ESMDomainEnumsExaminationStatus = null!,
    public examination: GetSummaryData['data'] = null!,
  ) {}
}
