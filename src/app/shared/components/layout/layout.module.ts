import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionDirectiveModule } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import {
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { BreadcrumbModule } from '../breadcrumbs';
import { LayoutComponent } from './layout.component';
import { MainViewComponent } from './main-view/main-view.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarModule } from './top-bar';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiAccordionModule,
  TuiCheckboxLabeledModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TopBarModule,
    BreadcrumbModule,
    PermissionDirectiveModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [LayoutComponent, SideBarComponent, MainViewComponent],
  exports: [LayoutComponent],
})
export class LayoutModule {}
