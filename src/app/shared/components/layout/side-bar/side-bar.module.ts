import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleDirectiveModule } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import {
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { SideBarComponent } from './side-bar.component';

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
    RoleDirectiveModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [SideBarComponent],
  exports: [SideBarComponent],
})
export class SideBarModule {}
