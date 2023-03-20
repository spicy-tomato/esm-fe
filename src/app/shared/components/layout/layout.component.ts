import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  importProvidersFrom,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { BehaviorSubject, filter, tap } from 'rxjs';
import {
  NotificationEffects,
  notificationFeatureKey,
  notificationReducer,
} from '../notification-list';
import { MainViewComponent } from './main-view/main-view.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';

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

@Component({
  selector: 'esm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent,
    SideBarComponent,
    MainViewComponent,
    ...TAIGA_UI,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  // PUBLIC PROPERTIES
  readonly isInCommonPage$ = new BehaviorSubject<boolean>(true);
  readonly hideCreateButton$ = new BehaviorSubject<boolean>(true);
  readonly commonPages = ['/create', '/data'];

  // CONSTRUCTOR
  constructor(private readonly router: Router) {
    this.triggerToggleSideBar();
  }

  // PRIVATE METHODS
  private triggerToggleSideBar(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        tap((e) => {
          e = e as NavigationEnd;
          this.isInCommonPage$.next(this.isCommonPage(e.url));
          this.hideCreateButton$.next(e.url === '/create');
        })
      )
      .subscribe();
  }

  private isCommonPage(url: string): boolean {
    return (
      url === '/' ||
      this.commonPages.find((p) => url.indexOf(p) === 0) !== undefined
    );
  }
}
