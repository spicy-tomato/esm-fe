import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, tap } from 'rxjs';

@Component({
  selector: 'esm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  // PUBLIC PROPERTIES
  readonly isInCommonPage$ = new BehaviorSubject<boolean>(true);
  readonly commonPages = ['/', '/create'];

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
          this.isInCommonPage$.next(this.commonPages.includes(e.url));
        })
      )
      .subscribe();
  }
}
