import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { PermissionDirectiveModule } from '@esm/shared/directives';
import { provideMockStore } from '@ngrx/store/testing';
import { BreadcrumbModule } from '../breadcrumbs';
import { LayoutComponent } from './layout.component';
import { NGRX, TAIGA_UI } from './layout.module';
import { MainViewComponent } from './main-view/main-view.component';
import { SideBarComponent } from './side-bar/side-bar.component';
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
        BreadcrumbModule,
        PermissionDirectiveModule,
        ...NGRX,
        ...TAIGA_UI,
      ],
      declarations: [LayoutComponent, SideBarComponent, MainViewComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
