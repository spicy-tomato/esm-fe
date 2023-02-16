import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExaminationDataComponent } from './data.component';

describe('DataComponent', () => {
  let component: ExaminationDataComponent;
  let fixture: ComponentFixture<ExaminationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExaminationDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
