import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppSelector } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { BreadcrumbModule } from '../breadcrumbs';
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
        RouterTestingModule,
        TopBarModule,
        SideBarModule,
        MainViewModule,
        BreadcrumbModule,
        ...NGRX,
        ...TAIGA_UI,
      ],
      declarations: [LayoutComponent, SideBarComponent, MainViewComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: AppSelector.breadcrumbs,
              value: [],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
