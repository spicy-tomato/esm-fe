import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { InvigilatorAssignFacultyComponent } from './assign-faculty.component';
import { NGRX, TAIGA_UI } from './assign-faculty.module';

describe('AssignFacultyComponent', () => {
  let component: InvigilatorAssignFacultyComponent;
  let fixture: ComponentFixture<InvigilatorAssignFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ...NGRX, ...TAIGA_UI],
      declarations: [InvigilatorAssignFacultyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
