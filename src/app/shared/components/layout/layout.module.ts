import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import {
  EchoService,
  NotificationEffects,
  notificationFeatureKey,
  notificationReducer,
} from '../notification-list/data-access';
import { LayoutComponent } from './layout.component';
import { MainViewModule } from './main-view/main-view.module';
import { SideBarModule } from './side-bar/side-bar.module';
import { TopBarModule } from './top-bar';

export const NGRX = [
  StoreModule.forFeature(notificationFeatureKey, notificationReducer),
  EffectsModule.forFeature([NotificationEffects]),
];
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
  providers: [EchoService],
})
export class LayoutModule {}
