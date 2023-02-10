import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LetModule } from '@ngrx/component';
import { provideMockStore } from '@ngrx/store/testing';
import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetModule],
      declarations: [TopBarComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
