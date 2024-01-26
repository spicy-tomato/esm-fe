import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaidExamDepartmentComponent } from './exam-department.component';

describe('ExamDepartmentComponent', () => {
  let component: PaidExamDepartmentComponent;
  let fixture: ComponentFixture<PaidExamDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(PaidExamDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
