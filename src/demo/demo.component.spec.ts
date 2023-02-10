import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@esm/shared/components';
import { AppSelector } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { SideBarModule } from 'src/app/shared/components/layout/side-bar/side-bar.module';
import { DemoComponent } from './demo.component';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        LayoutModule,
        SideBarModule,
      ],
      declarations: [DemoComponent],
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

    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
