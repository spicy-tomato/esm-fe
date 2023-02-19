import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ExaminationDataTableComponent } from './table.component';
import { NGRX, TAIGA_UI } from './table.module';

describe('TableComponent', () => {
  let component: ExaminationDataTableComponent;
  let fixture: ComponentFixture<ExaminationDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ScrollingModule, ...NGRX, ...TAIGA_UI],
      declarations: [ExaminationDataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
