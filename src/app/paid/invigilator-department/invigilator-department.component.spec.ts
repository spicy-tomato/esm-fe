import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaidInvigilatorDepartmentComponent } from './invigilator-department.component';

describe('InvigilatorDepartmentComponent', () => {
  let component: PaidInvigilatorDepartmentComponent;
  let fixture: ComponentFixture<PaidInvigilatorDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    }).compileComponents();

    fixture = TestBed.createComponent(PaidInvigilatorDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
