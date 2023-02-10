import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionDirectiveModule } from '@esm/shared/directives';
import {
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { SideBarComponent } from './side-bar.component';

const TAIGA_UI = [
  TuiAccordionModule,
  TuiCheckboxLabeledModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
];

@NgModule({
  imports: [CommonModule, RouterModule, PermissionDirectiveModule, ...TAIGA_UI],
  declarations: [SideBarComponent],
  exports: [SideBarComponent],
})
export class SideBarModule {}
