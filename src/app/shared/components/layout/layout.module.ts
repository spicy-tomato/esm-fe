import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@ngrx/component';
import {
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { LayoutComponent } from './layout.component';
import { MainViewModule } from './main-view/main-view.module';
import { SideBarModule } from './side-bar/side-bar.module';
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
    TopBarModule,
    SideBarModule,
    MainViewModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class LayoutModule {}
