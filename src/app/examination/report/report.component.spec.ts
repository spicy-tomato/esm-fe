import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExaminationReportComponent } from './report.component';

describe('ReportComponent', () => {
  let component: ExaminationReportComponent;
  let fixture: ComponentFixture<ExaminationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(ExaminationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
