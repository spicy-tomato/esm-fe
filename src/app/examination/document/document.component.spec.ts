import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationDocumentComponent } from './document.component';

describe('DocumentComponent', () => {
  let component: ExaminationDocumentComponent;
  let fixture: ComponentFixture<ExaminationDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
