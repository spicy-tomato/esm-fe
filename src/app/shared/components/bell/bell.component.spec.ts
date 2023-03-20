import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { BellComponent } from './bell.component';
import { NGRX, TAIGA_UI } from './bell.component';

describe('BellComponent', () => {
  let component: BellComponent;
  let fixture: ComponentFixture<BellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ...NGRX, ...TAIGA_UI],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(BellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
