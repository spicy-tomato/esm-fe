import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { LoaderComponent } from './loader.component';
import { NGRX } from './loader.module';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ...NGRX],
      declarations: [LoaderComponent],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
