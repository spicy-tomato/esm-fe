import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

class VarContext<T = unknown> {
  public $implicit: T = null!;
  public esmVar: T = null!;
}

@Directive({
  selector: '[esmVar]',
})
export class VarDirective<T = unknown> {
  // INPUT
  @Input() set esmVar(context: T) {
    this.context.$implicit = this.context.esmVar = context;

    if (!this.hasView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
      this.hasView = true;
    }
  }

  // PRIVATE PROPERTIES
  private context: VarContext<T> = new VarContext<T>();
  private hasView = false;

  // CONSTRUCTOR
  constructor(
    private templateRef: TemplateRef<VarContext<T>>,
    private viewContainerRef: ViewContainerRef
  ) {}
}
