import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExaminationCreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: ExaminationCreateComponent;
  let fixture: ComponentFixture<ExaminationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExaminationCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
