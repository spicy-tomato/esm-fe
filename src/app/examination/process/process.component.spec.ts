import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ExaminationProcessComponent } from './process.component';
import { TAIGA_UI } from './process.module';

describe('ExaminationProcessComponent', () => {
  let component: ExaminationProcessComponent;
  let fixture: ComponentFixture<ExaminationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ...TAIGA_UI],
      declarations: [ExaminationProcessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
