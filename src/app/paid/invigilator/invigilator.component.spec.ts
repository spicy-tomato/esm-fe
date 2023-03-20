import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaidInvigilatorComponent } from './invigilator.component';

describe('InvigilatorComponent', () => {
  let component: PaidInvigilatorComponent;
  let fixture: ComponentFixture<PaidInvigilatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    }).compileComponents();

    fixture = TestBed.createComponent(PaidInvigilatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
