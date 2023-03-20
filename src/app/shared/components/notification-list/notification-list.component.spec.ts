import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RelativeTimePipe } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  notificationFeatureKey,
  notificationInitialState,
  NotificationPageAction,
  NotificationSelector,
} from './data-access';
import {
  NGRX,
  NotificationListComponent,
  TAIGA_UI,
} from './notification-list.component';

describe('NotificationListComponent', () => {
  let component: NotificationListComponent;
  let fixture: ComponentFixture<NotificationListComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, RelativeTimePipe, ...NGRX, ...TAIGA_UI],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
            [notificationFeatureKey]: notificationInitialState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore = TestBed.inject(MockStore);
  });

  afterEach(() => mockStore.resetSelectors());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call handleDataChange', () => {
      const spy = spyOn<any>(component, 'handleDataChange');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSeeMore', () => {
    it('should dispatch NotificationPageAction.getData', () => {
      const spy = spyOn(component['store'], 'dispatch');
      component.onSeeMore(0);
      expect(spy).toHaveBeenCalledWith(NotificationPageAction.getData(0)());
    });
  });

  describe('markAllAsRead', () => {
    it('should dispatch NotificationPageAction.markAllAsRead', () => {
      const spy = spyOn(component['store'], 'dispatch');
      component.markAllAsRead();
      expect(spy).toHaveBeenCalledOnceWith(
        NotificationPageAction.markAllAsRead()
      );
    });

    it('should set openOptions to `false`', () => {
      component.markAllAsRead();
      expect(component.openOptions).toBeFalse();
    });
  });

  describe('openNotification', () => {
    it('should dispatch NotificationPageAction.openNotification', async () => {
      const spy = spyOn(component['router'], 'navigate');
      await component.openNotification();
      expect(spy).toHaveBeenCalledOnceWith(['/notification']);
    });

    it('should set openOptions to `false`', async () => {
      spyOn(component['router'], 'navigate');
      await component.openNotification();
      expect(component.openOptions).toBeFalse();
    });
  });

  describe('markAsRead', () => {
    it('should dispatch NotificationPageAction.markAsRead', () => {
      const spy = spyOn(component['store'], 'dispatch');
      component.markAsRead(0);
      expect(spy).toHaveBeenCalledWith(
        NotificationPageAction.markAsRead({ id: 0 })
      );
    });
  });

  describe('data$', () => {
    it('[No data] should not call cdr.markForCheck', fakeAsync(() => {
      const spy = spyOn(component['cdr'], 'markForCheck');
      mockStore.overrideSelector(NotificationSelector.data, []);

      mockStore.refreshState();
      fixture.detectChanges();

      component.data$.subscribe(() => expect(spy).not.toHaveBeenCalled());
    }));

    it('[Have data] should call cdr.markForCheck', fakeAsync(() => {
      const spy = spyOn(component['cdr'], 'markForCheck');
      mockStore.overrideSelector(NotificationSelector.data, [
        [
          {
            id: 1,
            createdAt: new Date(),
            data: {
              content: '',
            },
            readAt: new Date(),
            sender: '',
            type: 0,
            updatedAt: new Date(),
          },
        ],
      ]);

      mockStore.refreshState();
      fixture.detectChanges();

      component.data$.subscribe(() => {
        expect(spy).toHaveBeenCalled();
        discardPeriodicTasks();
      });
    }));
  });
});
