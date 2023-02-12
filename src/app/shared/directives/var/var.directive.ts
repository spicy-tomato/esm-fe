import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

type VarContext = {
  $implicit: unknown;
  esmVar: unknown;
};

@Directive({
  selector: '[esmVar]',
})
export class VarDirective {
  // INPUT
  @Input() set esmVar(context: unknown) {
    this.context.$implicit = this.context.esmVar = context;

    if (!this.hasView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
      this.hasView = true;
    }
  }

  // PRIVATE PROPERTIES
  private context: VarContext = {
    $implicit: null,
    esmVar: null,
  };

  private hasView = false;

  // CONSTRUCTOR
  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainerRef: ViewContainerRef
  ) {}
}
