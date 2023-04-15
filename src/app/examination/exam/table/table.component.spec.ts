import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExaminationExamTableComponent } from './table.component';
import { ExaminationExamStore } from '../exam.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('ExaminationExamTableComponent', () => {
  let component: ExaminationExamTableComponent;
  let fixture: ComponentFixture<ExaminationExamTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ExaminationExamStore,
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationExamTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
