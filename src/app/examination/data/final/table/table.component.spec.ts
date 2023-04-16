import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExaminationDataFinalTableComponent } from './table.component';
import { ExaminationDataFinalStore } from '../final.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('ExaminationDataFinalTableComponent', () => {
  let component: ExaminationDataFinalTableComponent;
  let fixture: ComponentFixture<ExaminationDataFinalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ExaminationDataFinalStore,
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationDataFinalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
