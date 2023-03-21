import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleDirective } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import {
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { SideBarConstant } from './side-bar.constant';
import { SideBarStore } from './side-bar.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiAccordionModule,
  TuiCheckboxLabeledModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
];

@Component({
  selector: 'esm-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, RoleDirective, ...NGRX, ...TAIGA_UI],
  providers: [SideBarStore],
})
export class SideBarComponent {
  // INJECT PROPERTIES
  private readonly store = inject(SideBarStore);

  // PUBLIC PROPERTIES
  readonly items = SideBarConstant.items;
  readonly examinationId$ = this.store.examinationId$;
}
