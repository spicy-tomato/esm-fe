import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppSelector, AppState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NotificationSelector, NotificationState } from './data-access';
import { NotificationListComponent } from './notification-list.component';
import { NGRX, TAIGA_UI } from './notification-list.module';

describe('NotificationListComponent', () => {
  let component: NotificationListComponent;
  let fixture: ComponentFixture<NotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...NGRX, ...TAIGA_UI],
      declarations: [NotificationListComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: AppSelector.user,
              value: null,
            },
            {
              selector: NotificationSelector.all,
              value: [],
            },
            {
              selector: NotificationSelector.unread,
              value: [],
            },
            {
              selector: NotificationSelector.selectHasUnread,
              value: false,
            },
            {
              selector: NotificationSelector.data,
              value: [[], []],
            },
            {
              selector: NotificationSelector.hasNext,
              value: [false, false],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
