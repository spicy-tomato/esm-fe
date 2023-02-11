import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, AppSelector, appInitialState } from '@esm/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { BreadcrumbModule } from '../breadcrumbs';
import {
  EchoService,
  notificationFeatureKey,
} from '../notification-list/data-access';
import { LayoutComponent } from './layout.component';
import { NGRX, TAIGA_UI } from './layout.module';
import { MainViewComponent } from './main-view/main-view.component';
import { MainViewModule } from './main-view/main-view.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideBarModule } from './side-bar/side-bar.module';
import { TopBarModule } from './top-bar';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TopBarModule,
        SideBarModule,
        MainViewModule,
        BreadcrumbModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        ...NGRX,
        ...TAIGA_UI,
      ],
      declarations: [LayoutComponent, SideBarComponent, MainViewComponent],
      providers: [
        EchoService,
        { provide: APP_ENV, useValue: {} },
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
            [notificationFeatureKey]: {
              all: {
                data: [],
                status: 'idle',
                milestone: new Date().toString(),
                error: null,
                hasNext: false,
              },
              unread: {
                data: [],
                status: 'idle',
                milestone: new Date().toString(),
                error: null,
                hasNext: false,
              },
            },
          },
          selectors: [
            {
              selector: AppSelector.breadcrumbs,
              value: [],
            },
            {
              selector: AppSelector.user,
              value: null,
            },
          ],
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
