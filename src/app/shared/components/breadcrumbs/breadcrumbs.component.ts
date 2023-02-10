import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'esm-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {}
