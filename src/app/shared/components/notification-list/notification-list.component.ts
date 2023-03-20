import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RelativeTimePipe } from '@esm/core';
import { AppSelector, AppState } from '@esm/store';
import { LetModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import {
  TuiActiveZoneDirective,
  TuiActiveZoneModule,
  TuiDestroyService,
} from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiLineClampModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import { BehaviorSubject, filter, takeUntil, tap } from 'rxjs';
import {
  NotificationListOptions,
  NOTIFICATION_LIST_OPTIONS,
} from './data-access';
import { EchoMessage } from './data-access/models';
import {
  NotificationPageAction,
  NotificationSelector,
  NotificationState,
} from './data-access/store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiActiveZoneModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiHintModule,
  TuiLineClampModule,
  TuiMarkerIconModule,
  TuiSvgModule,
];

@Component({
  selector: 'esm-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, RelativeTimePipe, ...NGRX, ...TAIGA_UI],
  providers: [
    TuiDestroyService,
    tuiButtonOptionsProvider({
      appearance: 'flat',
      shape: 'rounded',
      size: 's',
    }),
  ],
})
export class NotificationListComponent implements OnInit {
  // INPUT
  @Input() activeZone?: TuiActiveZoneDirective;

  // PUBLIC PROPERTIES
  readonly tabsBtn = ['Tất cả', 'Chưa đọc'];
  readonly activeTabIndex$ = new BehaviorSubject<number>(0);
  readonly data$ = this.store.select(NotificationSelector.data);
  readonly hasNext$ = this.store.select(NotificationSelector.hasNext);
  readonly hasUnread$ = this.store.select(NotificationSelector.selectHasUnread);
  readonly nameTitle$ = this.appStore.select(AppSelector.user);

  openDropdown = false;
  openOptions = false;

  // CONSTRUCTOR
  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    @Inject(NOTIFICATION_LIST_OPTIONS)
    public readonly options: NotificationListOptions,
    private readonly store: Store<NotificationState>,
    private readonly appStore: Store<AppState>,
    private readonly destroy$: TuiDestroyService
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.handleDataChange();
  }

  // PUBLIC METHODS
  notificationCountMatcher = (item: EchoMessage): boolean => !item.readAt;

  onSeeMore(tabIndex: number): void {
    this.store.dispatch(NotificationPageAction.getData(tabIndex)());
  }

  markAllAsRead(): void {
    this.store.dispatch(NotificationPageAction.markAllAsRead());
    this.openOptions = false;
  }

  async openNotification(): Promise<void> {
    await this.router.navigate(['/notification']);
    this.openOptions = false;
  }

  markAsRead(id: number): void {
    this.store.dispatch(NotificationPageAction.markAsRead({ id }));
  }

  // PRIVATE METHODS
  private handleDataChange(): void {
    this.data$
      .pipe(
        filter((notificationTypes) =>
          notificationTypes.some(({ length }) => length > 0)
        ),
        tap(() => this.cdr.markForCheck()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
