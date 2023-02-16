import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExaminationHandoverComponent } from './handover.component';

describe('HandoverComponent', () => {
  let component: ExaminationHandoverComponent;
  let fixture: ComponentFixture<ExaminationHandoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExaminationHandoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationHandoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
