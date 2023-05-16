import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ExaminationExamStore } from '../exam.store';
import { ExaminationExamHeaderComponent } from './header.component';

describe('ExaminationExamHeaderComponent', () => {
  let component: ExaminationExamHeaderComponent;
  let fixture: ComponentFixture<ExaminationExamHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
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

    fixture = TestBed.createComponent(ExaminationExamHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
