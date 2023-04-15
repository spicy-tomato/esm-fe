import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExaminationExamHeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_ENV } from '@esm/core';
import { ExaminationExamStore } from '../exam.store';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('ExaminationExamHeaderComponent', () => {
  let component: ExaminationExamHeaderComponent;
  let fixture: ComponentFixture<ExaminationExamHeaderComponent>;

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

    fixture = TestBed.createComponent(ExaminationExamHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
