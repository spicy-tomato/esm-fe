import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ExaminationProcessComponent, TAIGA_UI } from './process.component';

describe('ExaminationProcessComponent', () => {
  let component: ExaminationProcessComponent;
  let fixture: ComponentFixture<ExaminationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ...TAIGA_UI],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
