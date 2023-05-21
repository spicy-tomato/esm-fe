import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  EchoService,
  notificationFeatureKey,
  notificationInitialState,
} from '../notification-list/data-access';
import { LayoutComponent, NGRX, TAIGA_UI } from './layout.component';
import { MainViewComponent } from './main-view/main-view.component';
import { SideBarComponent } from './side-bar';
import { TopBarComponent } from './top-bar';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TESTING_COMMON_IMPORTS,
        TopBarComponent,
        SideBarComponent,
        MainViewComponent,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        NGRX,
        TAIGA_UI,
      ],
      providers: [
        EchoService,
        { provide: APP_ENV, useValue: {} },
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
            [notificationFeatureKey]: notificationInitialState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
