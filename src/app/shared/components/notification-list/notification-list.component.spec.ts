import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  notificationFeatureKey,
  notificationInitialState,
} from './data-access';
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
