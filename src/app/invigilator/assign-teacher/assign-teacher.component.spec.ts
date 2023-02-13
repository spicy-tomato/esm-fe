import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { InvigilatorAssignTeacherComponent } from './assign-teacher.component';
import { NGRX, TAIGA_UI } from './assign-teacher.module';

describe('AssignTeacherComponent', () => {
  let component: InvigilatorAssignTeacherComponent;
  let fixture: ComponentFixture<InvigilatorAssignTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ...NGRX, ...TAIGA_UI],
      declarations: [InvigilatorAssignTeacherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
