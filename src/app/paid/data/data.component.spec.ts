import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaidDataComponent } from './data.component';

describe('DataComponent', () => {
  let component: PaidDataComponent;
  let fixture: ComponentFixture<PaidDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaidDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaidDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
